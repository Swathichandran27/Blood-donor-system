package com.examly.springapp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.DonationCenter;
import com.examly.springapp.Repository.DonationCenterRepository;

@Service
public class DonationCenterService {

    @Autowired
    private DonationCenterRepository donationCenterRepository;

    public List<DonationCenter> getAllCenters() {
        return donationCenterRepository.findAll();
    }

    public List<DonationCenter> searchByCity(String city) {
        return donationCenterRepository.findByCityIgnoreCase(city);
    }

    public List<DonationCenter> searchByPincode(String pincode) {
        return donationCenterRepository.findByPincode(pincode);
    }

    public DonationCenter saveCenter(DonationCenter center) {
        return donationCenterRepository.save(center);
    }
}