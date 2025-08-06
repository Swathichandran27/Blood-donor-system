package com.examly.springapp.Repository;

import java.time.LocalDate;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.Entity.DonationCamp;

public interface DonationCampRepo extends JpaRepository<DonationCamp,Long>{
@Query("SELECT d FROM DonationCamp d WHERE d.date > :today ORDER BY d.date ASC")
List<DonationCamp> findUpcomingCamps(@Param("today") LocalDate today);

    
}