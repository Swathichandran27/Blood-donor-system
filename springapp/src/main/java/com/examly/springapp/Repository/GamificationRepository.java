package com.examly.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.examly.springapp.Entity.Gamification;
import com.examly.springapp.Entity.User;

public interface GamificationRepository extends JpaRepository<Gamification,Long>{
Gamification findByUser(User user);
    
    

}