package com.example.Backend;

public class SomeService {

    public String sayHello() {
        return "Hello World";
    }

    public void throwException() {
        throw new IllegalArgumentException("Invalid argument");
    }
}
