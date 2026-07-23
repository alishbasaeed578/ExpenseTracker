package com.library.loginsystem.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    // Loads your index.html (Login Page)
    @GetMapping("/login")
    public String loginPage() {
        return "index"; // Looks for index.html in /templates
    }

    // Loads your dashboard.html
    @GetMapping("/dashboard")
    public String dashboardPage() {
        return "dashboard"; // Looks for dashboard.html in /templates
    }
}