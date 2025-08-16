package com.examly.springapp.Controller;

import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.AppointmentDTO;
import com.examly.springapp.Repository.AppointmentRepository;
import com.examly.springapp.Service.AppointmentService;
import com.examly.springapp.Service.GamificationService;
import com.examly.springapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private GamificationService gamificationService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        try {
            appointmentService.bookAppointment(appointmentDTO);
            return ResponseEntity.ok("Appointment booked successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to book appointment: " + e.getMessage());
        }
    }

    @GetMapping("/history/{userId}")
    public List<AppointmentDTO> getHistory(@PathVariable Long userId) {
        return appointmentService.getAppointmentHistory(userId);
    }

    @GetMapping("/upcoming/{userId}")
    public List<Appointment> getUpcoming(@PathVariable Long userId) {
        return appointmentService.getUpcomingAppointments(userId);
    }

    @PutMapping("/reschedule")
    public Appointment reschedule(@RequestParam Long appointmentId,
                                  @RequestParam String newDate,
                                  @RequestParam String newTime) throws Exception {
        return appointmentService.rescheduleAppointment(appointmentId, LocalDate.parse(newDate), LocalTime.parse(newTime));
    }

    @DeleteMapping("/cancel/{id}")
    public void cancel(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
    }

    @GetMapping("/available-slots")
    public List<LocalTime> getAvailableSlots(@RequestParam Long centerId,
                                         @RequestParam String date) {
    return appointmentService.getAvailableSlots(centerId, LocalDate.parse(date));
    }

     @Autowired
    private UserService userService;

    @PutMapping("/{id}/complete")
    public String markAsCompleted(@PathVariable Long id) {
        Appointment a = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        a.setStatus("Completed");
        appointmentRepository.save(a);

        gamificationService.updateGamificationForUser(a.getUser().getId());

        
        userService.updateTotalDonations(a.getUser().getId());

        return "Marked as completed";
    }


}
