package com.examly.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.examly.springapp.Entity.UrgentRequest;

public interface UrgentRequestRepository extends JpaRepository<UrgentRequest,Long> {
    
    List<UrgentRequest> findByFulfilledFalse();

    List<UrgentRequest> findByBloodGroupAndLocationAndFulfilledFalse(String bloodGroup, String location);
    
} 