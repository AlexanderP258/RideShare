package se.pumarin.rideshare.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import se.pumarin.rideshare.ride.Ride;
import se.pumarin.rideshare.ride.RideService;
import se.pumarin.rideshare.ride.dto.RideResponse;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final RideService rideService;

    public UserController(UserService userService, RideService rideService) {
        this.userService = userService;
        this.rideService = rideService;
    }

    @GetMapping("/{id}/rides")
    public ResponseEntity<List<RideResponse>> getRidesCreatedByUser(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        if (!user.getId().equals(id)) {
            return ResponseEntity.status(403).build();
        }

        List<Ride> createdRides = rideService.findRidesByDriverUsername(user.getUsername());
        List<RideResponse> response = createdRides.stream()
                .map(RideResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/bookings")
    public ResponseEntity<List<RideResponse>> getRidesUserHasJoined(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        if (!user.getId().equals(id)) {
            return ResponseEntity.status(403).build();
        }

        List<Ride> joinedRides = rideService.findRidesUserHasJoined(user.getUsername());
        List<RideResponse> response = joinedRides.stream()
                .map(RideResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(response);
    }
}