package com.library.loginsystem.controller;

import com.library.loginsystem.model.User;
import com.library.loginsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        service.register(user);
        return "User registered!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> result = service.login(user.getEmail(), user.getPassword());

        if (result.isPresent()) {
            return "Success";
        } else {
            return "Invalid credentials";
        }
    }
}