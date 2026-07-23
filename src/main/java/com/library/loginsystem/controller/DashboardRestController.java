package com.library.loginsystem.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardRestController {

    @GetMapping("/data")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // This is where you would normally call your database/repository
        stats.put("username", "User");
        stats.put("totalRecords", 150);
        stats.put("status", "System Active");

        return stats; // Returns JSON: {"username": "User", "totalRecords": 150, ...}
    }
}