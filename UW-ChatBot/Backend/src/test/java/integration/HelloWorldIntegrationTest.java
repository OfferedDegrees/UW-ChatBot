package integration;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class HelloWorldIntegrationTest {

    @Test
    public void testHelloWorldIntegration() {
        // Simulate integrating components
        String part1 = "Hello";
        String part2 = "World!";
        String message = part1 + ", " + part2;

        // Expected outcome
        String expected = "Hello, World!";

        // Assertion to verify integration works as expected
        assertEquals(expected, message);
    }
}
