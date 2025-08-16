package com.examly.springapp.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Service.BloodStockAggregatorService;

@RestController
@RequestMapping("/api/bloodstock")
public class BloodStockController {

    private final BloodStockAggregatorService aggregatorService;

    public BloodStockController(BloodStockAggregatorService aggregatorService) {
        this.aggregatorService = aggregatorService;
    }

    @GetMapping("/status/by-city")
    public ResponseEntity<Map<String, String>> getStatusByCity(@RequestParam String city) {
        return ResponseEntity.ok(aggregatorService.getAggregatedStockStatusByCity(city));
    }

    @GetMapping("/status/by-pincode")
    public ResponseEntity<Map<String, String>> getStatusByPincode(@RequestParam String pincode) {
        return ResponseEntity.ok(aggregatorService.getAggregatedStockStatusByPincode(pincode));
    }
}
