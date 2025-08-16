package com.examly.springapp.Entity;



import java.util.*;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;

@Entity
public class DonationCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String pincode;
    private String address;
    private String contactNumber;
    private String operatingHours;

    private Double latitude;
    private Double longitude;
    

    @ElementCollection
    private List<String> acceptedBloodGroups; 

    @ElementCollection
    @CollectionTable(name = "blood_stock")
    @MapKeyColumn(name = "blood_group")
    @Column(name = "stock")
    private Map<String, Integer> bloodGroupStock = new HashMap<>();

    public Map<String, Integer> getBloodGroupStock() {
        return bloodGroupStock;
    }

    public void setBloodGroupStock(Map<String, Integer> bloodGroupStock) {
        this.bloodGroupStock = bloodGroupStock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getOperatingHours() {
        return operatingHours;
    }

    public void setOperatingHours(String operatingHours) {
        this.operatingHours = operatingHours;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public List<String> getAcceptedBloodGroups() {
        return acceptedBloodGroups;
    }

    public void setAcceptedBloodGroups(List<String> acceptedBloodGroups) {
        this.acceptedBloodGroups = acceptedBloodGroups;
    }

    public DonationCenter() {}

    public DonationCenter(String name, String city, String pincode, String address,
                          String contactNumber, String operatingHours,
                          Double latitude, Double longitude,
                          List<String> acceptedBloodGroups) {
        this.name = name;
        this.city = city;
        this.pincode = pincode;
        this.address = address;
        this.contactNumber = contactNumber;
        this.operatingHours = operatingHours;
        this.latitude = latitude;
        this.longitude = longitude;
        this.acceptedBloodGroups = acceptedBloodGroups;
    }

    
}
