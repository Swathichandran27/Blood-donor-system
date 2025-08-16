package com.examly.springapp.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.Healthstat;
import com.examly.springapp.Repository.AppointmentRepository;
import com.examly.springapp.Repository.HealthStatRepository;

@RestController
@RequestMapping("/healthstats")
public class HealthStatController {

    @Autowired
    private HealthStatRepository healthStatRepo;

    @Autowired
    private AppointmentRepository appointmentRepo;

    
    @PostMapping("/{appointmentId}")
    public Healthstat addHealthStat(@PathVariable Long appointmentId, @RequestBody Healthstat stat) {
        Appointment appt = appointmentRepo.findById(appointmentId).orElse(null);
        if (appt == null) {
            throw new RuntimeException("Appointment not found");
        }

        stat.setAppointment(appt);
        return healthStatRepo.save(stat);
    }

   
    @GetMapping("/{appointmentId}")
    public Healthstat getHealthStat(@PathVariable Long appointmentId) {
        return healthStatRepo.findByAppointmentId(appointmentId);
    }
}
