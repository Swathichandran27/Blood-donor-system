package com.examly.springapp.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.Feedback;
import com.examly.springapp.Repository.AppointmentRepository;
import com.examly.springapp.Repository.FeedbackRepository;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Feedback addFeedback(Long appointmentId, Feedback feedback) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        feedback.setAppointment(appointment);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getAdverseReactions() {
        return feedbackRepository.findByReportedAdverseReactionTrue();
    }

    
}
