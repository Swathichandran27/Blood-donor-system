package com.examly.springapp.Service;

import com.examly.springapp.Entity.*;
import com.examly.springapp.Repository.*;

import org.springframework.stereotype.Service;

@Service
public class GamificationService {

    private final GamificationRepository gamificationRepository;
    private final UserRepository userRepository;

    public GamificationService(GamificationRepository gamificationRepository, UserRepository userRepository) {
        this.gamificationRepository = gamificationRepository;
        this.userRepository = userRepository;
    }

    // Update gamification points, badge, level, certificate based on user's total donations
    public void updateGamificationForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Gamification gamification = gamificationRepository.findByUser(user);

        // If no gamification record exists, create default
        if (gamification == null) {
            gamification = new Gamification(user);
        }

        int donationCount = user.getTotalDonations(); 
        gamification.setTotalPoints(donationCount * 10); 

        if (donationCount >= 10) {
            gamification.setBadge("Gold");
            gamification.setLevel("Hero");
            gamification.setCertificate("Gold Certificate - Thank you!");
        } else if (donationCount >= 5) {
            gamification.setBadge("Silver");
            gamification.setLevel("Intermediate");
            gamification.setCertificate("Silver Certificate - Great work!");
        } else if (donationCount >= 1) {
            gamification.setBadge("Bronze");
            gamification.setLevel("Beginner");
            gamification.setCertificate("Bronze Certificate - Thank you!");
        } else {
            gamification.setBadge("Newbie");
            gamification.setLevel("Starter");
            gamification.setCertificate("");
        }

        gamificationRepository.save(gamification);
    }

    // Fetch gamification for user, auto-create if not exists
    public Gamification getGamificationForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Gamification gamification = gamificationRepository.findByUser(user);

        // Auto-create gamification for new users
        if (gamification == null) {
            gamification = new Gamification(user);
            gamification.setBadge("Newbie");
            gamification.setLevel("Starter");
            gamification.setTotalPoints(0);
            gamification.setCertificate("");
            gamificationRepository.save(gamification);
        }

        return gamification;
    }
}
