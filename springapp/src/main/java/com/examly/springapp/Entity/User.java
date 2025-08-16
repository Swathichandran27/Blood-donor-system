package com.examly.springapp.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String password;
    private String gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String address;
    private String phone;
    private int totalDonations;
    

    @Column(unique = true)
    private String referralCode;
    private int referralPoints = 0;
     
    private String referredBy; 

    public String getReferredBy() {
        return referredBy;
    }

    public void setReferredBy(String referredBy) {
        this.referredBy = referredBy;
    }

    public String getReferralCode() {
        return referralCode;
    }

    public void setReferralCode(String referralCode) {
        this.referralCode = referralCode;
    }

    public int getReferralPoints() {
        return referralPoints;
    }

    public void setReferralPoints(int referralPoints) {
        this.referralPoints = referralPoints;
    }

    public int getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(int totalDonations) {
        this.totalDonations = totalDonations;
    }


    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean eligible = true;
    private LocalDate lastDonationDate;

    

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Appointment> appointments = new ArrayList<>();


    public User() {
    }

    public User(Long id, String fullName, String email, String password, String gender,
                LocalDate dateOfBirth, String bloodGroup, String address, String phone,
                Role role, boolean eligible, LocalDate lastDonationDate,int referralPoints,String referralCode,int totalDonations) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.bloodGroup = bloodGroup;
        this.address = address;
        this.phone = phone;
        this.role = role;
        this.eligible = eligible;
        this.lastDonationDate = lastDonationDate;
        this.referralPoints=referralPoints;
        this.referralCode=referralCode;
        this.totalDonations=totalDonations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEligible() {
        return eligible;
    }

    public void setEligible(boolean eligible) {
        this.eligible = eligible;
    }

    public LocalDate getLastDonationDate() {
        return lastDonationDate;
    }

    public void setLastDonationDate(LocalDate lastDonationDate) {
        this.lastDonationDate = lastDonationDate;
    }
    public List<Appointment> getAppointments() {
    return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
    this.appointments = appointments;
    }


    public enum Role {
        DONOR,
        ADMIN,
        GUEST
    }
}
