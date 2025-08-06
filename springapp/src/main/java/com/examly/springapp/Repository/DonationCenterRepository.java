package com.examly.springapp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.Entity.DonationCenter;

public interface DonationCenterRepository extends JpaRepository<DonationCenter, Long> {

    List<DonationCenter> findByCityIgnoreCase(String city);

    @Query("SELECT dc FROM DonationCenter dc WHERE LOWER(dc.city) = LOWER(:city)")
    List<DonationCenter> searchByCity(@Param("city") String city);


    List<DonationCenter> findByPincode(String pincode);

    @Query("SELECT dc FROM DonationCenter dc WHERE dc.pincode = :pincode")
    List<DonationCenter> searchByPincode(@Param("pincode") String pincode);

   
}
