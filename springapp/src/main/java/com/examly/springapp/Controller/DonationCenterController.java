package com.examly.springapp.Controller;

import com.examly.springapp.Entity.DonationCenter;
import com.examly.springapp.Service.DonationCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donationCenters")
public class DonationCenterController {

    @Autowired
    private DonationCenterService donationCenterService;

    @PostMapping
    public DonationCenter addDonationCenter(@RequestBody DonationCenter center) {
        return donationCenterService.saveCenter(center);
    }

    @GetMapping
    public List<DonationCenter> getAllCenters() {
        return donationCenterService.getAllCenters();
    }

   
    @GetMapping("/search/city")
    public List<DonationCenter> searchByCity(@RequestParam String city) {
        return donationCenterService.searchByCity(city);
    }


    @GetMapping("/search/pincode")
    public List<DonationCenter> searchByPincode(@RequestParam String pincode) {
        return donationCenterService.searchByPincode(pincode);
    }

    
}