package com.examly.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.Entity.Healthstat;

public interface HealthStatRepository extends JpaRepository<Healthstat, Long> {
    Healthstat findByAppointmentId(Long appointmentId);
}
