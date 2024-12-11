package se.pumarin.rideshare.user;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Test
    void testRegisterUserSuccessfully() {
        UserRepository mockRepo = mock(UserRepository.class);
        PasswordEncoder mockEncoder = mock(PasswordEncoder.class);

        when(mockRepo.existsByUsername("testuser")).thenReturn(false);
        when(mockRepo.existsByEmail("test@test.com")).thenReturn(false);
        when(mockEncoder.encode("password")).thenReturn("encodedPassword");
        when(mockRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserService service = new UserService(mockRepo, mockEncoder);
        User user = service.registerUser("testuser", "test@test.com", "password");

        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
        assertEquals("test@test.com", user.getEmail());
        assertEquals("encodedPassword", user.getPassword());
    }

    @Test
    void testRegisterUserFailsForExistingUsernameOrEmail() {
        UserRepository mockRepo = mock(UserRepository.class);
        PasswordEncoder mockEncoder = mock(PasswordEncoder.class);

        when(mockRepo.existsByUsername("testuser")).thenReturn(true);

        UserService service = new UserService(mockRepo, mockEncoder);

        assertThrows(IllegalArgumentException.class,
                () -> service.registerUser("testuser", "test@test.com", "password"),
                "Expected exception due to duplicate username"
        );
    }
}
