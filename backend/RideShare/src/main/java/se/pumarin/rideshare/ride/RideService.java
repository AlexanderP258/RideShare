package se.pumarin.rideshare.ride;

import se.pumarin.rideshare.user.User;
import se.pumarin.rideshare.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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
}