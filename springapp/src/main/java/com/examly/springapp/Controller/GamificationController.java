package com.examly.springapp.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Entity.Gamification;
import com.examly.springapp.Service.GamificationService;

@RestController
@RequestMapping("/gamification")
public class GamificationController {

    private final GamificationService gamificationService;

    public GamificationController(GamificationService gamificationService) {
        this.gamificationService = gamificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Gamification> getGamification(@PathVariable Long userId) {
        return ResponseEntity.ok(gamificationService.getGamificationForUser(userId));
    }
}
