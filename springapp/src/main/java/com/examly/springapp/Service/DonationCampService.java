package com.examly.springapp.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.Entity.DonationCamp;
import com.examly.springapp.Repository.DonationCampRepo;

@Service
public class DonationCampService {

    @Autowired
    private DonationCampRepo donationCampRepository;

    public List<DonationCamp> getAllCamps() {
        return donationCampRepository.findAll();
    }

    public DonationCamp addCamp(DonationCamp camp) {
        return donationCampRepository.save(camp);
    }

    public List<DonationCamp> getUpcomingCamps() {
        return donationCampRepository.findUpcomingCamps(java.time.LocalDate.now());
    }
}

