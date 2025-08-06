package com.examly.springapp.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.Entity.User;


import java.util.*;
public interface UserRepository extends JpaRepository<User,Long> {
      Optional<User> findByEmail(String email);
      List<User> findByRole(User.Role role);
     // Optional<User> findByReferralCode(String referralCode);
       User findByReferralCode(String referralCode);
       
      @Query("SELECT u FROM User u ORDER BY u.totalDonations DESC")
       List<User> findTopDonors(Pageable pageable);
} 
