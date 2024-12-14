package se.pumarin.rideshare.ride;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByDriverUsernameAndDepartureTimeAfter(String username, LocalDateTime now);

    @Query("SELECT r FROM Ride r WHERE r.startLocation = :start AND r.endLocation = :end AND r.departureTime > :now")
    List<Ride> findFutureRidesByRoute(String start, String end, LocalDateTime now);
}