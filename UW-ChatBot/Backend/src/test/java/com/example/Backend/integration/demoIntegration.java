package com.example.Backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testSayHelloEndpoint() throws Exception {
        // Perform GET request on /hello and expect "Hello World" as the response
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
    }

    @Test
    void testNotFoundEndpoint() throws Exception {
        // Test a non-existing endpoint and expect a 404 Not Found response
        mockMvc.perform(get("/nonexistent"))
                .andExpect(status().isNotFound());
    }
}
