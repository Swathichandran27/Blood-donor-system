package com.examly.springapp.Service;


import com.examly.springapp.Entity.Appointment;
import com.examly.springapp.Entity.EligibilityFormDTO;
import com.examly.springapp.Entity.User;
import com.examly.springapp.Repository.AppointmentRepository;
import com.examly.springapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

   @Autowired
    private AppointmentRepository appointmentRepository;

    public void updateTotalDonations(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Appointment> completedAppointments = appointmentRepository
            .findByUserAndStatusIgnoreCase(user, "Completed");

        System.out.println("Appointments: " + completedAppointments.size());
        for (Appointment a : completedAppointments) {
            System.out.println(a.getId() + " - " + a.getStatus());
        }

        user.setTotalDonations(completedAppointments.size());
        userRepository.save(user);
    }

    public User registerUser(User user) {
    // Save user first (referralCode will be generated after ID is created)
    User savedUser = userRepository.save(user);

    // Generate unique referral code
    String generatedCode = "REF" + savedUser.getId();
    savedUser.setReferralCode(generatedCode);

    // If referredBy is passed (i.e., used someone else's referral code)
    if (user.getReferredBy() != null && !user.getReferredBy().isEmpty()) {
        savedUser.setReferredBy(user.getReferredBy());

        // Find the referring user by referral code
        User referringUser = userRepository.findByReferralCode(user.getReferredBy());

        if (referringUser != null) {
            referringUser.setReferralPoints(referringUser.getReferralPoints() + 10);
            userRepository.save(referringUser);
        }
    }

    return userRepository.save(savedUser); // Save again with referralCode & referredBy
}


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getPassword().equals(password);
    }
    public User updateUser(Long id, User updatedUser) {
    return userRepository.findById(id).map(user -> {
        user.setFullName(updatedUser.getFullName());
        user.setAddress(updatedUser.getAddress());
        user.setPhone(updatedUser.getPhone());
        user.setBloodGroup(updatedUser.getBloodGroup());
        user.setDateOfBirth(updatedUser.getDateOfBirth());
        user.setGender(updatedUser.getGender());
        user.setRole(updatedUser.getRole());
        user.setLastDonationDate(updatedUser.getLastDonationDate());
        user.setEligible(updatedUser.isEligible());
        return userRepository.save(user);
    }).orElse(null);
}

    public List<User> getAllDonors() {
    return userRepository.findByRole(User.Role.DONOR);
    }

    public List<User> getEligibleDonors() {
    List<User> donors = userRepository.findByRole(User.Role.DONOR); 

    List<User> eligibleDonors = new ArrayList<>();

    LocalDate today = LocalDate.now();

    for (User donor : donors) {
        LocalDate lastDonation = donor.getLastDonationDate();

        if (lastDonation == null || lastDonation.plusMonths(3).isBefore(today) || lastDonation.plusMonths(3).isEqual(today)) {
            eligibleDonors.add(donor);
        }
    }

    return eligibleDonors;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }  

    

    public String assessEligibility(EligibilityFormDTO form) {
        StringBuilder result = new StringBuilder();

        if (form.isHasChronicIllness()) result.append(" Chronic illness may disqualify you.\n");
        if (form.isOnMedication()) result.append(" Current medications may affect donation.\n");
        if (form.isHadSurgeryRecently()) result.append("Recent surgery may delay donation.\n");
        if (form.isTraveledRecently()) result.append("Travel may require temporary deferral.\n");
        if (form.isUnderweight()) result.append("Weight below limit. Risk of complications.\n");

        if (result.isEmpty()) return "Eligible to donate";
        return result.toString() + "\n(This is a preliminary check. Final check at donation center.)";
    }

    public List<User> getTopDonors(int limit) {
    Pageable pageable = PageRequest.of(0, limit);
    return userRepository.findTopDonors(pageable);
}



}


