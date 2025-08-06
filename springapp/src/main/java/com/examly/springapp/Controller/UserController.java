package com.examly.springapp.Controller;

import com.examly.springapp.Entity.EligibilityFormDTO;
import com.examly.springapp.Entity.User;

import com.examly.springapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    

    //register for donor
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    //admin-view all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //login validation-(login check)
    @GetMapping("/email/{email}")
public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
    System.out.println("Email received: " + email);
    Optional<User> userOpt = userService.getUserByEmail(email);
    System.out.println("User found: " + userOpt.orElse(null));
    return userOpt.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}



    //admin management-admin deletes user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    //basic login check-no jwt as of now
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        boolean isValid = userService.login(email, password);
        return isValid ? "Login Successful" : "Invalid Credentials";
    }
   //donors can edit their profile
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // GET - All Donors-admin
    @GetMapping("/donors")
    public ResponseEntity<List<User>> getAllDonors() {
        List<User> donors = userService.getAllDonors();
        return ResponseEntity.ok(donors);
    }

    // GET - Eligible Donors-admin
    @GetMapping("/donors/eligible")
    public ResponseEntity<List<User>> getEligibleDonors() {
        List<User> eligibleDonors = userService.getEligibleDonors();
        return ResponseEntity.ok(eligibleDonors);
    }

    //porvide unique donorID for Donors
    @GetMapping("/{id}/donorId")
    public ResponseEntity<String> getDonorId(@PathVariable Long id) {
    Optional<User> user = userService.getUserById(id);
    return user.map(u -> ResponseEntity.ok("DONOR-" + u.getId()))
               .orElse(ResponseEntity.notFound().build());
}
//prescreening test for donors
@PostMapping("/eligibility-check")
public ResponseEntity<String> checkEligibility(@RequestBody EligibilityFormDTO form) {
    String result = userService.assessEligibility(form);
    return ResponseEntity.ok(result + " (This is a preliminary check. Final check at donation center.)");
}


        @GetMapping("/leaderboard")
public ResponseEntity<List<Map<String, Object>>> getLeaderboard(
        @RequestParam(defaultValue = "10") int topN) {

    List<User> topUsers = userService.getTopDonors(topN);
    
    // Format minimal info to return
    List<Map<String, Object>> response = new ArrayList<>();
    for (User user : topUsers) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("name", user.getFullName());
        userInfo.put("totalDonations", user.getTotalDonations());
        response.add(userInfo);
    }

    return ResponseEntity.ok(response);
}


}
