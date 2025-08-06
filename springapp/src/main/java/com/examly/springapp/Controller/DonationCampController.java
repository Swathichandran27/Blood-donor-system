package com.examly.springapp.Controller;


import com.examly.springapp.Entity.DonationCamp;
import com.examly.springapp.Service.DonationCampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donationCamps")
public class DonationCampController {

    @Autowired
    private DonationCampService donationCampService;

    // Adding donation camp
    @PostMapping
    public DonationCamp addDonationCamp(@RequestBody DonationCamp camp) {
        return donationCampService.addCamp(camp);
    }

    // Get all donation camps
    @GetMapping
    public List<DonationCamp> getAllDonationCamps() {
        return donationCampService.getAllCamps();
    }

    // Get only upcoming donation camps
    @GetMapping("/upcoming")
    public List<DonationCamp> getUpcomingCamps() {
        return donationCampService.getUpcomingCamps();
    }
}
