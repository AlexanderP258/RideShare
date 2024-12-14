package se.pumarin.rideshare.ride;

import se.pumarin.rideshare.ride.dto.CreateRideRequest;
import se.pumarin.rideshare.ride.dto.RideResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    public ResponseEntity<RideResponse> createRide(@Valid @RequestBody CreateRideRequest dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Ride ride = rideService.createRide(
                username,
                dto.getStartLocation(),
                dto.getEndLocation(),
                dto.getDepartureTime(),
                dto.getAvailableSeats(),
                dto.getPrice()
        );

        return ResponseEntity.ok(RideResponse.fromEntity(ride));
    }
}