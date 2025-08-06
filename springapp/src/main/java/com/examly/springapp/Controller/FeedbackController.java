package com.examly.springapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.Entity.Feedback;
import com.examly.springapp.Service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/{appointmentId}")
    public Feedback submitFeedback(@PathVariable Long appointmentId, @RequestBody Feedback feedback) {
        return feedbackService.addFeedback(appointmentId, feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/adverse")
    public List<Feedback> getAdverseReactions() {
        return feedbackService.getAdverseReactions();
    }

    @GetMapping("/tips")
public List<String> getPostDonationTips() {
    return List.of(
        "Drink at least 2 glasses of water within 30 minutes.",
        "Avoid strenuous activity for the next 24 hours.",
        "If you feel dizzy, lie down and elevate your feet.",
        "Keep the bandage on for a few hours."
    );
}

}
