import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FeedbackForm = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: "",
    reportedAdverseReaction: false,
    adverseReactionDetails: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback({
      ...feedback,
      [name]: type === "checkbox" ? checked : value,
    });
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/feedbacks/${appointmentId}`,
        feedback,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Feedback submitted successfully!");
      navigate("/manage-appointments"); // ✅ go back to appointments page after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Give Feedback for Appointment #{appointmentId}</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={feedback.rating}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Comment:</label>
        <textarea
          name="comment"
          value={feedback.comment}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>
          Reported Adverse Reaction:
          <input
            type="checkbox"
            name="reportedAdverseReaction"
            checked={feedback.reportedAdverseReaction}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        {feedback.reportedAdverseReaction && (
          <>
            <label>Adverse Reaction Details:</label>
            <textarea
              name="adverseReactionDetails"
              value={feedback.adverseReactionDetails}
              onChange={handleChange}
              required
            />
            <br /><br />
          </>
        )}

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
