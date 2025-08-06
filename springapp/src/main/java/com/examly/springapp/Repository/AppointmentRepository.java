package com.examly.springapp.Repository;

import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserIdOrderByAppointmentDateDesc(Long userId);

    List<Appointment> findByCenterIdAndAppointmentDateAndAppointmentTime(Long centerId, LocalDate date, LocalTime time);

    List<Appointment> findByUserIdAndAppointmentDateAfter(Long userId, LocalDate today);
    List<Appointment> findByCenterIdAndAppointmentDate(Long centerId, LocalDate appointmentDate);
    int countByUserAndStatusIgnoreCase(User user, String status);
    List<Appointment> findByUserAndStatusIgnoreCase(User user, String status);

}
