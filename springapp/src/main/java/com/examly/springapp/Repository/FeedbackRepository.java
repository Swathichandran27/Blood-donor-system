package com.examly.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.Entity.Feedback;
import java.util.*;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

     List<Feedback> findByReportedAdverseReactionTrue();
} 