package com.examly.springapp.Service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.DonationCenter;
import com.examly.springapp.Repository.DonationCenterRepository;


@Service

public class BloodStockAggregatorService {
    
    private final DonationCenterRepository donationCenterRepository;

    public BloodStockAggregatorService(DonationCenterRepository repository) {
        this.donationCenterRepository = repository;
    }
    public Map<String, String> getAggregatedStockStatusByCity(String city) {
    List<DonationCenter> centers = donationCenterRepository.searchByCity(city);
    return computeStockStatus(centers);
}

public Map<String, String> getAggregatedStockStatusByPincode(String pincode) {
    List<DonationCenter> centers = donationCenterRepository.searchByPincode(pincode);
    return computeStockStatus(centers);
}

private Map<String, String> computeStockStatus(List<DonationCenter> centers) {
    Map<String, Integer> totalStock = new HashMap<>();

    for (DonationCenter center : centers) {
        if (center.getBloodGroupStock() != null) {
            for (Map.Entry<String, Integer> entry : center.getBloodGroupStock().entrySet()) {
                totalStock.merge(entry.getKey(), entry.getValue(), Integer::sum);
            }
        }
    }

    Map<String, String> bloodStatus = new HashMap<>();
    for (Map.Entry<String, Integer> entry : totalStock.entrySet()) {
        int qty = entry.getValue();
        String status = qty < 10 ? "Critical" :
                        qty < 30 ? "Low" :
                        qty < 50 ? "Stable" : "Good";
        bloodStatus.put(entry.getKey(), status);
    }

    return bloodStatus;
}

}
