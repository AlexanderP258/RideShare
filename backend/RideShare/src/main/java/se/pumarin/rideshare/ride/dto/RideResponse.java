package se.pumarin.rideshare.ride.dto;

import se.pumarin.rideshare.ride.Ride;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RideResponse {
    private Long id;
    private Long driverId;
    private String driverUsername;
    private String startLocation;
    private String endLocation;
    private LocalDateTime departureTime;
    private Integer availableSeats;
    private Double price;
    private LocalDateTime createdAt;

    public static RideResponse fromEntity(Ride ride) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setDriverId(ride.getDriver().getId());
        response.setDriverUsername(ride.getDriver().getUsername());
        response.setStartLocation(ride.getStartLocation());
        response.setEndLocation(ride.getEndLocation());
        response.setDepartureTime(ride.getDepartureTime());
        response.setAvailableSeats(ride.getAvailableSeats());
        response.setPrice(ride.getPricePerSeat());
        response.setCreatedAt(ride.getCreatedAt());
        return response;
    }
}