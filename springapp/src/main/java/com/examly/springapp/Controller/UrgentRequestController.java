package com.examly.springapp.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Entity.UrgentRequest;
import com.examly.springapp.Repository.UrgentRequestRepository;

@RestController
@RequestMapping("/urgent-requests")
public class UrgentRequestController {

    @Autowired
    private UrgentRequestRepository urgentRequestRepo;

    @PostMapping("/add")
    public UrgentRequest addUrgentRequest(@RequestBody UrgentRequest urgentRequest) {
        urgentRequest.setFulfilled(false); // default to not fulfilled
        return urgentRequestRepo.save(urgentRequest);
    }

    @GetMapping("/all")
    public List<UrgentRequest> getAllUrgentRequests() {
        return urgentRequestRepo.findByFulfilledFalse();
    }

   
    @GetMapping("/filter")
    public List<UrgentRequest> filterUrgentRequests(@RequestParam String bloodGroup, @RequestParam String location) {
        return urgentRequestRepo.findByBloodGroupAndLocationAndFulfilledFalse(bloodGroup, location);
    }

   
    @PutMapping("/fulfill/{id}")
    public ResponseEntity<String> markAsFulfilled(@PathVariable Long id) {
        Optional<UrgentRequest> req = urgentRequestRepo.findById(id);
        if (req.isPresent()) {
            UrgentRequest r = req.get();
            r.setFulfilled(true);
            urgentRequestRepo.save(r);
            return ResponseEntity.ok("Marked as fulfilled");
        }
        return ResponseEntity.notFound().build();
    }
}
