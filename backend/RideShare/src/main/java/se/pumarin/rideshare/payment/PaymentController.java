package se.pumarin.rideshare.payment;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import se.pumarin.rideshare.ride.RideService;
import se.pumarin.rideshare.ride.Ride;
import se.pumarin.rideshare.user.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final RideService rideService;
    private final UserService userService;

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    public PaymentController(RideService rideService, UserService userService) {
        this.rideService = rideService;
        this.userService = userService;
    }

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody PaymentRequest request) {
        Stripe.apiKey = stripeSecretKey;

        Ride ride = rideService.findById(request.getRideId());
        if (ride == null) {
            throw new IllegalArgumentException("Ride not found.");
        }
        if (ride.getAvailableSeats() < 1) {
            throw new IllegalArgumentException("No seats available for this ride.");
        }

        long amountInOres = (long) (ride.getPricePerSeat() * 100);

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInOres)
                    .setCurrency("sek")
                    .putMetadata("rideId", String.valueOf(ride.getId()))
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());
            return responseData;

        } catch (Exception e) {
            throw new RuntimeException("Error creating PaymentIntent: " + e.getMessage());
        }
    }
}