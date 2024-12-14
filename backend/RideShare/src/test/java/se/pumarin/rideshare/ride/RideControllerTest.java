package se.pumarin.rideshare.ride;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;
import se.pumarin.rideshare.config.GlobalExceptionHandler;
import se.pumarin.rideshare.ride.dto.CreateRideRequest;
import se.pumarin.rideshare.user.User;
import se.pumarin.rideshare.user.UserService;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RideController.class)
@ContextConfiguration(classes = {
        RideControllerTest.TestConfig.class,
        RideControllerTest.TestSecurityConfig.class,
        GlobalExceptionHandler.class,
        RideController.class
})
class RideControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public UserService userService() {
            return Mockito.mock(UserService.class);
        }

        @Bean
        public RideService rideService() {
            return Mockito.mock(RideService.class);
        }


        @Bean
        public MethodValidationPostProcessor methodValidationPostProcessor() {
            return new MethodValidationPostProcessor();
        }
    }

    @TestConfiguration
    static class TestSecurityConfig {
        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

            return http
                    .csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                    .httpBasic(Customizer.withDefaults())
                    .build();
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private RideService rideService;

    @Test
    @DisplayName("POST /api/rides without authentication should return 401")
    void createRide_Unauthenticated() throws Exception {
        CreateRideRequest request = new CreateRideRequest();
        request.setStartLocation("S");
        request.setEndLocation("G");
        request.setDepartureTime(LocalDateTime.now().plusHours(1));
        request.setAvailableSeats(2);
        request.setPrice(50.0);

        mockMvc.perform(post("/api/rides")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/rides with valid data and authentication should create ride")
    @WithMockUser(username = "testuser")
    void createRide_Authenticated_ValidData() throws Exception {
        CreateRideRequest request = new CreateRideRequest();
        request.setStartLocation("Stockholm");
        request.setEndLocation("Gothenburg");
        request.setDepartureTime(LocalDateTime.now().plusHours(1));
        request.setAvailableSeats(2);
        request.setPrice(100.0);

        User mockUser = User.builder().id(1L).username("testuser").build();
        Mockito.when(userService.findByUsername("testuser")).thenReturn(mockUser);

        Ride savedRide = Ride.builder()
                .id(10L)
                .driver(mockUser)
                .startLocation("Stockholm")
                .endLocation("Gothenburg")
                .departureTime(request.getDepartureTime())
                .availableSeats(2)
                .pricePerSeat(100.0)
                .build();

        Mockito.when(rideService.createRide(
                eq("testuser"),
                eq("Stockholm"),
                eq("Gothenburg"),
                any(LocalDateTime.class),
                eq(2),
                eq(100.0)
        )).thenReturn(savedRide);

        mockMvc.perform(post("/api/rides")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.driverUsername").value("testuser"));
    }

    @Test
    @DisplayName("POST /api/rides with invalid data should return 400")
    @WithMockUser(username = "testuser")
    void createRide_InvalidData() throws Exception {
        CreateRideRequest request = new CreateRideRequest();
        request.setStartLocation("");
        request.setEndLocation("");
        request.setDepartureTime(LocalDateTime.now().minusHours(1));
        request.setAvailableSeats(0);
        request.setPrice(-10.0);

        mockMvc.perform(post("/api/rides")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}
