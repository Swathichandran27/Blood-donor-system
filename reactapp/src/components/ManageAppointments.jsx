import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaEdit, FaTrash, FaHistory, FaCommentDots } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ManageAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleData, setRescheduleData] = useState({ id: null, date: "", time: "" });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]); 
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080/appointments";

  // Fetch upcoming appointments
  const fetchAppointments = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/upcoming/${id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointment history
  const fetchHistory = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/history/${id}`);
      setHistory(res.data);

      const givenFeedbacks = res.data
        .filter((appt) => appt.feedbackGiven) 
        .map((appt) => appt.id);
      setSubmittedFeedbacks(givenFeedbacks);
    } catch (err) {
      console.error("Error fetching appointment history", err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      fetchAppointments(storedUser.id);
      fetchHistory(storedUser.id);
    }
  }, [userId]);

  // Cancel appointment
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.delete(`${BASE_URL}/cancel/${id}`);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      fetchAppointments(storedUser.id);
      fetchHistory(storedUser.id);
    } catch (err) {
      console.error("Error cancelling appointment", err);
    }
  };

  // Reschedule appointment
  const handleReschedule = async () => {
    if (!rescheduleData.date || !rescheduleData.time) {
      alert("Please select a new date and time");
      return;
    }
    try {
      await axios.put(
        `${BASE_URL}/reschedule?appointmentId=${rescheduleData.id}&newDate=${rescheduleData.date}&newTime=${rescheduleData.time}`
      );
      setRescheduleData({ id: null, date: "", time: "" });
      const storedUser = JSON.parse(localStorage.getItem("user"));
      fetchAppointments(storedUser.id);
      fetchHistory(storedUser.id);
    } catch (err) {
      console.error("Error rescheduling appointment", err);
    }
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <span className="badge bg-success">{status}</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "cancelled":
        return <span className="badge bg-danger">{status}</span>;
      case "completed":
        return <span className="badge bg-primary">{status}</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div className="container-fluid">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Manage Your Appointments</h2>
           <button
  className="btn btn-primary"
  onClick={() => navigate("/eligibility")}
>
  + Book Appointment
</button>

          </div>

          {/* Next Appointment Card */}
          {appointments.length > 0 && (
            <div className="alert alert-info">
              <FaCalendarAlt className="me-2" />
              <strong>Next Appointment:</strong> {appointments[0].appointmentDate} at{" "}
              {appointments[0].appointmentTime} ({appointments[0].donationType})
            </div>
          )}

          {/* Upcoming Appointments Table */}
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Donation Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.appointmentDate}</td>
                    <td>{appt.appointmentTime}</td>
                    <td>{appt.donationType}</td>
                    <td>{getStatusBadge(appt.status)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => setRescheduleData({ id: appt.id, date: "", time: "" })}
                      >
                        <FaEdit /> Reschedule
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleCancel(appt.id)}
                      >
                        <FaTrash /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Reschedule Form */}
          {rescheduleData.id && (
            <div className="reschedule-form mt-4 p-3 bg-light rounded">
              <h4>Reschedule Appointment</h4>
              <input
                type="date"
                value={rescheduleData.date}
                onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                className="form-control mb-2"
              />
              <input
                type="time"
                value={rescheduleData.time}
                onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                className="form-control mb-2"
              />
              <button className="btn btn-success me-2" onClick={handleReschedule}>
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setRescheduleData({ id: null, date: "", time: "" })}
              >
                Cancel
              </button>
            </div>
          )}

          {/* History Section */}
          <div className="mt-5">
            <h3>
              <FaHistory className="me-2" />
              Appointment History
            </h3>
            {history.length === 0 ? (
              <p>No past appointments found.</p>
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Donation Type</th>
                    <th>Status</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((appt) => (
                    <tr key={appt.id}>
                   
                      <td>{appt.appointmentDate}</td>
                      <td>{appt.appointmentTime}</td>
                      <td>{appt.donationType}</td>
                      <td>{getStatusBadge(appt.status)}</td>
                      <td>
                        {appt.status.toLowerCase() === "completed" ? (
                          submittedFeedbacks.includes(appt.id) ? (
                            <span className="text-success">✅ Feedback Submitted</span>
                          ) : (
                            console.log(appt),
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate(`/feedback/${appt.id}`)}
                            >
                              <FaCommentDots /> Give Feedback
                            </button>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Donation Tips */}
          <div className="mt-4 p-3 bg-light rounded">
            <h5>Donation Tips</h5>
            <ul>
              <li>Drink plenty of water before donating.</li>
              <li>Eat a healthy meal within 2 hours before your appointment.</li>
              <li>Avoid alcohol 24 hours before donation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
