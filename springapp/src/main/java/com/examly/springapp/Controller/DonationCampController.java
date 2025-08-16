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

   
    @PostMapping
    public DonationCamp addDonationCamp(@RequestBody DonationCamp camp) {
        return donationCampService.addCamp(camp);
    }

   
    @GetMapping
    public List<DonationCamp> getAllDonationCamps() {
        return donationCampService.getAllCamps();
    }

   
    @GetMapping("/upcoming")
    public List<DonationCamp> getUpcomingCamps() {
        return donationCampService.getUpcomingCamps();
    }
}
