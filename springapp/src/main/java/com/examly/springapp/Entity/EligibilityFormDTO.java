package com.examly.springapp.Entity;


public class EligibilityFormDTO {
    private boolean traveledRecently;
    private boolean hasChronicIllness;
    private boolean onMedication;
    private boolean underweight;
    private boolean hadSurgeryRecently;

    public EligibilityFormDTO() {
    }

    public boolean isTraveledRecently() {
        return traveledRecently;
    }

    public void setTraveledRecently(boolean traveledRecently) {
        this.traveledRecently = traveledRecently;
    }

    public boolean isHasChronicIllness() {
        return hasChronicIllness;
    }

    public void setHasChronicIllness(boolean hasChronicIllness) {
        this.hasChronicIllness = hasChronicIllness;
    }

    public boolean isOnMedication() {
        return onMedication;
    }

    public void setOnMedication(boolean onMedication) {
        this.onMedication = onMedication;
    }

    public boolean isUnderweight() {
        return underweight;
    }

    public void setUnderweight(boolean underweight) {
        this.underweight = underweight;
    }

    public boolean isHadSurgeryRecently() {
        return hadSurgeryRecently;
    }

    public void setHadSurgeryRecently(boolean hadSurgeryRecently) {
        this.hadSurgeryRecently = hadSurgeryRecently;
    }
}
