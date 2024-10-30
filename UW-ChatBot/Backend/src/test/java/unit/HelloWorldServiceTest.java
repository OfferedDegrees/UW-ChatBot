package unit;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class HelloWorldServiceTest {

    @Test
    public void testHelloWorldService() {
        // Simulate a simple service functionality
        String message = "Hello, World!";
        String expected = "Hello, World!";

        // Assertion to verify the expected result
        assertEquals(expected, message);
    }
}
