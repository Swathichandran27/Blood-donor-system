package com.examly.springapp.Entity;

import javax.persistence.*;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating;

    private String comment;

    private boolean reportedAdverseReaction;

    private String adverseReactionDetails;


    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean isReportedAdverseReaction() {
        return reportedAdverseReaction;
    }

    public void setReportedAdverseReaction(boolean reportedAdverseReaction) {
        this.reportedAdverseReaction = reportedAdverseReaction;
    }

    public String getAdverseReactionDetails() {
        return adverseReactionDetails;
    }

    public void setAdverseReactionDetails(String adverseReactionDetails) {
        this.adverseReactionDetails = adverseReactionDetails;
    }

    

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
