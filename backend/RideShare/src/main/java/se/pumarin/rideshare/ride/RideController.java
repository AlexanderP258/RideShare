package se.pumarin.rideshare.ride;

import se.pumarin.rideshare.ride.dto.CreateRideRequest;
import se.pumarin.rideshare.ride.dto.RideResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<RideResponse>> listRides(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(required = false) String date
    ) {
        LocalDateTime afterDate = null;
        if (date != null && !date.isBlank()) {
            afterDate = LocalDateTime.parse(date);
        }

        List<Ride> rides = rideService.findAvailableRides(start, end, afterDate);
        List<RideResponse> response = rides.stream()
                .map(RideResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<String> joinRide(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        rideService.joinRide(id, username);
        return ResponseEntity.ok("You have successfully joined the ride.");
    }
}