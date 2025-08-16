import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

const EligibilityCheck = () => {
  const [formData, setFormData] = useState({
    traveledRecently: false,
    hasChronicIllness: false,
    onMedication: false,
    underweight: false,
    hadSurgeryRecently: false,
  });
  const [result, setResult] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   const location = useLocation();
  const { centerId } = location.state || {};

  const handlePass = () => {
    navigate("/book-appointment", { state: { centerId } });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/eligibility-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to check eligibility');

      const data = await response.text();
      setResult(data);

      // ✅ Mark eligibility flag for navigation
      if (data.toLowerCase().includes('eligible')) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error checking eligibility. Please try again.');
      setIsEligible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      traveledRecently: false,
      hasChronicIllness: false,
      onMedication: false,
      underweight: false,
      hadSurgeryRecently: false,
    });
    setResult(null);
    setIsEligible(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <button onClick={() => navigate(-1)} className="btn btn-outline-danger mb-3">
            <FaArrowLeft className="me-2" /> Back
          </button>

          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center text-danger mb-3">Blood Donation Eligibility Check</h2>
              <p className="text-center mb-4 text-muted">
                Answer these questions to check if you're eligible to donate blood today.
              </p>

              {result ? (
                <div
                  className={`alert ${
                    isEligible ? 'alert-success' : 'alert-danger'
                  } text-center`}
                >
                  <h4 className="mb-3">
                    {isEligible ? (
                      <FaCheck className="me-2" />
                    ) : (
                      <FaTimes className="me-2" />
                    )}
                    {result}
                  </h4>
                  <p className="small text-muted">
                    Note: This is a preliminary check. A final medical screening will be conducted
                    at the donation center.
                  </p>

                  {/* ✅ If eligible, show proceed button */}
                  {isEligible && (
                    <button onClick={handlePass} className="btn btn-danger w-100 mb-2">Proceed to Book Appointment</button>
                   
                  )}

                  <button onClick={resetForm} className="btn btn-outline-danger w-100">
                    Check Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="traveledRecently"
                      name="traveledRecently"
                      checked={formData.traveledRecently}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="traveledRecently">
                      Have you traveled outside the country in the last 3 months?
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hasChronicIllness"
                      name="hasChronicIllness"
                      checked={formData.hasChronicIllness}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="hasChronicIllness">
                      Do you have any chronic illness (e.g., diabetes, heart disease)?
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="onMedication"
                      name="onMedication"
                      checked={formData.onMedication}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="onMedication">
                      Are you currently taking any medications?
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="underweight"
                      name="underweight"
                      checked={formData.underweight}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="underweight">
                      Is your weight below 50 kg (110 lbs)?
                    </label>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hadSurgeryRecently"
                      name="hadSurgeryRecently"
                      checked={formData.hadSurgeryRecently}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="hadSurgeryRecently">
                      Have you had surgery in the last 6 months?
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-danger btn-lg"
                    >
                      {isLoading ? 'Checking...' : 'Check Eligibility'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCheck;
