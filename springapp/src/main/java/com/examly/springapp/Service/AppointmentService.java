package com.examly.springapp.Service;

import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.AppointmentDTO;
import com.examly.springapp.Entity.DonationCenter;
import com.examly.springapp.Entity.User;
import com.examly.springapp.Repository.AppointmentRepository;
import com.examly.springapp.Repository.DonationCenterRepository;
import com.examly.springapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DonationCenterRepository centerRepository;

    // Accept DTO for booking
    public Appointment bookAppointment(AppointmentDTO dto) throws Exception {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new Exception("User not found"));

        DonationCenter center = centerRepository.findById(dto.getCenterId())
                .orElseThrow(() -> new Exception("Donation center not found"));

        // Check slot availability
        List<Appointment> existing = appointmentRepository
                .findByCenterIdAndAppointmentDateAndAppointmentTime(center.getId(), dto.getAppointmentDate(), dto.getAppointmentTime());

        if (!existing.isEmpty()) {
            throw new Exception("Slot already booked");
        }

        Appointment appointment = new Appointment(
                dto.getAppointmentDate(),
                dto.getAppointmentTime(),
                "Booked",
                dto.getDonationType(),
                user,
                center
        );
        
        return appointmentRepository.save(appointment);
    }

    public List<AppointmentDTO> getAppointmentHistory(Long userId) {
    return appointmentRepository.findByUserIdOrderByAppointmentDateDesc(userId)
            .stream()
            .map(a -> {
                AppointmentDTO dto = new AppointmentDTO();
                dto.setUserId(a.getUser().getId());
                dto.setCenterId(a.getCenter().getId());
                dto.setAppointmentDate(a.getAppointmentDate());
                dto.setAppointmentTime(a.getAppointmentTime());
                dto.setStatus(a.getStatus());
                dto.setDonationType(a.getDonationType());
                return dto;
            })
            .collect(Collectors.toList());
}
    public List<Appointment> getUpcomingAppointments(Long userId) {
        return appointmentRepository.findByUserIdAndAppointmentDateAfter(userId, LocalDate.now());
    }

    public void cancelAppointment(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    public Appointment rescheduleAppointment(Long appointmentId, LocalDate newDate, LocalTime newTime) throws Exception {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new Exception("Appointment not found"));

        appointment.setAppointmentDate(newDate);
        appointment.setAppointmentTime(newTime);
        return appointmentRepository.save(appointment);
    }
    public List<LocalTime> getAvailableSlots(Long centerId, LocalDate date) {
    // Define all possible slot times (e.g., every 30 min from 9am to 5pm)
    List<LocalTime> allSlots = new ArrayList<>();
    for (int hour = 9; hour < 17; hour++) {
        allSlots.add(LocalTime.of(hour, 0));
        allSlots.add(LocalTime.of(hour, 30));
    }

    // Get already booked slots
    List<Appointment> booked = appointmentRepository.findByCenterIdAndAppointmentDate(centerId, date);
    List<LocalTime> bookedTimes = booked.stream()
                                        .map(Appointment::getAppointmentTime)
                                        .toList();

    // Filter out booked times
    return allSlots.stream()
                   .filter(slot -> !bookedTimes.contains(slot))
                   .toList();
}

}
