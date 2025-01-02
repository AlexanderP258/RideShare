package se.pumarin.rideshare.ride;

import se.pumarin.rideshare.user.User;
import se.pumarin.rideshare.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class RideService {

    private final RideRepository rideRepository;
    private final UserService userService;

    public RideService(RideRepository rideRepository, UserService userService) {
        this.rideRepository = rideRepository;
        this.userService = userService;
    }

    public Ride createRide(String username, String startLocation, String endLocation,
                           LocalDateTime departureTime, Integer availableSeats, Double price) {

        if (departureTime.isBefore(LocalDateTime.now().plusMinutes(5))) {
            throw new IllegalArgumentException("Departure time must be at least 5 minutes in the future.");
        }

        User driver = userService.findByUsername(username);
        if (driver == null) {
            throw new IllegalArgumentException("Authenticated user not found.");
        }

        Ride ride = Ride.builder()
                .driver(driver)
                .startLocation(startLocation)
                .endLocation(endLocation)
                .departureTime(departureTime)
                .availableSeats(availableSeats)
                .pricePerSeat(price)
                .build();

        return rideRepository.save(ride);
    }

    public List<Ride> findAvailableRides(String start, String end, LocalDateTime afterDate) {
        LocalDateTime now = LocalDateTime.now();
        List<Ride> allRides = rideRepository.findAll();

        return allRides.stream()
                .filter(r -> r.getDepartureTime().isAfter(now))
                .filter(r -> r.getAvailableSeats() > 0)
                .filter(r -> start == null || start.isBlank() || r.getStartLocation().equalsIgnoreCase(start))
                .filter(r -> end == null || end.isBlank() || r.getEndLocation().equalsIgnoreCase(end))
                .filter(r -> afterDate == null || r.getDepartureTime().isAfter(afterDate))
                .toList();
    }

    public void joinRide(Long rideId, String username) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new IllegalArgumentException("Ride not found"));

        if (ride.getAvailableSeats() <= 0) {
            throw new IllegalArgumentException("No seats available for this ride.");
        }

        User user = userService.findByUsername(username);

        boolean alreadyJoined = ride.getPassengers().stream()
                .anyMatch(p -> p.getId().equals(user.getId()));
        if (alreadyJoined) {
            throw new IllegalArgumentException("You have already joined this ride.");
        }

        ride.getPassengers().add(user);
        ride.setAvailableSeats(ride.getAvailableSeats() - 1);
        rideRepository.save(ride);
    }

    public List<Ride> findRidesByDriverUsername(String driverUsername) {
        LocalDateTime now = LocalDateTime.now();


        return rideRepository.findAll().stream()
                .filter(r -> r.getDriver().getUsername().equalsIgnoreCase(driverUsername))
                .toList();
    }

    public List<Ride> findRidesUserHasJoined(String username) {
        User user = userService.findByUsername(username);

        return rideRepository.findAll().stream()
                .filter(r -> r.getPassengers().stream().anyMatch(p -> p.getId().equals(user.getId())))
                .toList();
    }

    public Ride findById(Long rideId) {
        return rideRepository.findById(rideId).orElse(null);
    }
}