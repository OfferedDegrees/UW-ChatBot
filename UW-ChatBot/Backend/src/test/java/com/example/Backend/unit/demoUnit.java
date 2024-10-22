package com.example.Backend.unit;

import com.example.Backend.SomeService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BackendUnitTests {

    @Test
    void testSayHello() {
        // Test a simple method in an isolated service
        SomeService service = new SomeService();
        String result = service.sayHello();
        assertEquals("Hello World", result);
    }

    @Test
    void testExceptionThrown() {
        // Test for exception handling in service methods
        SomeService service = new SomeService();
        assertThrows(IllegalArgumentException.class, () -> {
            service.throwException();
        });
    }
}
