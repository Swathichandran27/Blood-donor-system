/*import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [nextAppointment, setNextAppointment] = useState({
    date: "2025-08-20",
    time: "10:30 AM",
    center: "City Blood Bank",
    status: "Confirmed"
  });

  const [pastAppointments, setPastAppointments] = useState([
    {
      date: "2025-06-10",
      time: "09:00 AM",
      center: "Community Center",
      status: "Completed"
    }
  ]);

  const [countdown, setCountdown] = useState("");
  const [badges, setBadges] = useState([
    { name: "3 Donations", icon: "🏅" },
    { name: "1-Year Streak", icon: "🎯" },
    { name: "First Timer", icon: "⭐" }
  ]);

  const [availableSlots, setAvailableSlots] = useState([
    "Mon 10 AM", "Tue 02 PM", "Wed 09 AM", "Fri 11 AM"
  ]);

  // Countdown calculation
  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(`${nextAppointment.date} ${nextAppointment.time}`);
      const now = new Date();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`${days}d ${hours}h ${mins}m`);
      } else {
        setCountdown("Today's the day!");
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 60000);
    return () => clearInterval(timer);
  }, [nextAppointment]);

  return (
    <div className="container-fluid g-0 donor-dashboard">
      <div className="row g-0">
        
        <div className="col-md-2">
          <Sidebar />
        </div>

        
        <div className="col-md-10 p-4">
        
          <div className="row mb-4 g-4">
        
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card countdown-card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-uppercase text-muted mb-3">Next Appointment</h5>
                  <h2 className="display-4 mb-3 text-danger">{countdown}</h2>
                  <p className="lead">
                    {nextAppointment.date} at {nextAppointment.time}
                  </p>
                  <p className="text-muted">{nextAppointment.center}</p>
                  <span className={`badge bg-${nextAppointment.status === "Confirmed" ? "success" : "warning"} p-2`}>
                    {nextAppointment.status}
                  </span>
                </div>
              </div>
            </motion.div>

          
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card quick-actions-card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-4">Quick Actions</h5>
                  <div className="d-grid gap-3">
                    <button 
                      className="btn btn-danger btn-lg py-3"
                      onClick={() => (window.location.href = "/book-appointment")}
                    >
                      <i className="bi bi-calendar-plus me-2"></i>Book Appointment
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-lg py-3"
                      onClick={() => (window.location.href = "/appointments")}
                    >
                      <i className="bi bi-list-check me-2"></i>Manage Appointments
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

           
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card badges-card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-4">Your Achievements</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={index}
                        className="badge-item p-3 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="badge-icon display-4 mb-2">{badge.icon}</div>
                        <div className="badge-text">{badge.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card mb-4">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#upcoming">
                      Upcoming Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#past">
                      Past Appointments
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body p-0">
                <div className="tab-content">
                  
                  <div className="tab-pane fade show active" id="upcoming">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Center</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{nextAppointment.date}</td>
                            <td>{nextAppointment.time}</td>
                            <td>{nextAppointment.center}</td>
                            <td>
                              <span className={`badge bg-${nextAppointment.status === "Confirmed" ? "success" : "warning"}`}>
                                {nextAppointment.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="bi bi-calendar-event"></i> Reschedule
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                  <i className="bi bi-x-circle"></i> Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                 
                  <div className="tab-pane fade" id="past">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Center</th>
                            <th>Status</th>
                            <th>Feedback</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pastAppointments.map((appointment, index) => (
                            <tr key={index}>
                              <td>{appointment.date}</td>
                              <td>{appointment.time}</td>
                              <td>{appointment.center}</td>
                              <td>
                                <span className="badge bg-secondary">{appointment.status}</span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-danger">
                                  <i className="bi bi-chat-left-text"></i> Leave Feedback
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        
          <div className="row g-4">
          
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    <i className="bi bi-clock-history text-danger me-2"></i>
                    Available Slots Next Week
                  </h5>
                  <div className="d-flex flex-wrap gap-3">
                    {availableSlots.map((slot, index) => (
                      <motion.div
                        key={index}
                        className="slot-badge p-3 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        {slot}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="card donation-streak-card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title mb-3">Your Donation Streak</h5>
                  <div className="display-4 text-danger mb-3">5</div>
                  <p className="lead">
                    You've donated 5 times in the last year! Keep it up! 🎉
                  </p>
                  <div className="progress mt-4" style={{ height: "10px" }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: "75%" }}
                      aria-valuenow="75" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small className="text-muted">75% to your next milestone</small>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;*/
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [badgeData, setBadgeData] = useState(null);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [healthStats, setHealthStats] = useState(null);
  const [bloodStock, setBloodStock] = useState({});


  useEffect(() => {
  const fetchBloodStock = async () => {
    try {
      const stockRes = await axios.get(
        "http://localhost:8080/api/bloodstock/status/by-city?city=Chennai"
      );
      setBloodStock(stockRes.data);
    } catch (error) {
      console.error("Error fetching blood stock:", error);
    }
  };

  fetchBloodStock();
}, []);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.id) {
        window.location.href = "/";
        return;
      }

      // Next appointment
      try {
        const appointmentRes = await axios.get(
          `http://localhost:8080/appointments/upcoming/${storedUser.id}`
        );
        const appointmentData = appointmentRes.data[0];
        setNextAppointment(appointmentData);
      } catch (err) {
        console.warn("No upcoming appointment:", err);
        setNextAppointment(null);
      }

      // Fetch past appointments for health stats
      try {
        const pastRes = await axios.get(
          `http://localhost:8080/appointments/history/${storedUser.id}`
        );
        const completedAppointments = pastRes.data.filter(app => app.status === "Completed");
        if (completedAppointments.length > 0) {
          // Take the latest completed appointment
          const latestCompleted = completedAppointments[completedAppointments.length - 1];
          const healthRes = await axios.get(
            `http://localhost:8080/healthstats/${latestCompleted.id}`
          );
          setHealthStats(healthRes.data || null);
        }
      } catch (err) {
        console.warn("No health stats available from completed appointments:", err);
        setHealthStats(null);
      }

      // Badges
      try {
        const badgeRes = await axios.get(
          `http://localhost:8080/gamification/${storedUser.id}`
        );
        setBadgeData(badgeRes.data);
      } catch (err) {
        console.warn("No badges available:", err);
        setBadgeData(null);
      }

      // Upcoming campaigns
      try {
        const campaignRes = await axios.get(
          `http://localhost:8080/api/donationCamps/upcoming`
        );
        setUpcomingCampaigns(campaignRes.data);
      } catch (err) {
        console.warn("No upcoming campaigns:", err);
        setUpcomingCampaigns([]);
      }

      // Urgent requests
      try {
        const urgentRes = await axios.get(
          `http://localhost:8080/urgent-requests/all`
        );
        setUrgentRequests(urgentRes.data);
      } catch (err) {
        console.warn("No urgent requests:", err);
        setUrgentRequests([]);
      }

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  fetchData();
}, []);



  useEffect(() => {
    if (!nextAppointment) return;

    const calculateCountdown = () => {
      console.log("next appointment",nextAppointment);
      const target = new Date(`${nextAppointment.appointmentDate} ${nextAppointment.appointmentTime}`);
      const now = new Date();
      const diff = target - now;
      console.log(nextAppointment.appointmentDate,nextAppointment.appointmentTime);
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`${days}d ${hours}h ${mins}m`);
      } else {
        setCountdown("Today’s the day!");
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 60000);
    return () => clearInterval(timer);
  }, [nextAppointment]);

  return (
    <div className="container-fluid g-0 donor-dashboard">
  <div className="row g-0">
    {/* Sidebar */}
    <div className="col-md-2">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="col-md-10 p-4">
      <div className="row g-4">
        
        {/* Next Appointment */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-danger rounded-4">
            <div className="card-body">
              <h5 className="card-title text-danger mb-3">
                <i className="bi bi-calendar-event me-2"></i> Next Appointment
              </h5>
              {nextAppointment ? (
                <>
                  <p><strong>Date:</strong> {nextAppointment.appointmentDate}</p>
                  <p><strong>Time:</strong> {nextAppointment.appointmentTime}</p>
                  <p><strong>Location:</strong> {nextAppointment.location}</p>
                  <p className="fw-bold text-primary">⏳ Countdown: {countdown}</p>
                  {healthStats ? (
                    <div className="mt-3 p-3 border rounded bg-light">
                      <h6 className="text-primary mb-2">
                        <i className="bi bi-heart-pulse me-2"></i> Health Stats
                      </h6>
                      <p>Pulse: {healthStats.pulse} bpm</p>
                      <p>Blood Pressure: {healthStats.systolicPressure}/{healthStats.diastolicPressure} mmHg</p>
                      <p>Notes: {healthStats.notes}</p>
                    </div>
                  ) : (
                    <p className="text-muted">No health stats recorded yet.</p>
                  )}
                </>
              ) : (
                <p className="text-muted">No upcoming appointment found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Your Badge */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-warning rounded-4">
            <div className="card-body">
              <h5 className="card-title text-warning mb-3">
                <i className="bi bi-award me-2"></i> Your Badge
              </h5>
              {badgeData ? (
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-2">{badgeData.badge}</h6>
                  <p className="mb-1"><strong>Total Points:</strong> {badgeData.totalPoints}</p>
                  <p className="mb-1"><strong>Level:</strong> {badgeData.level}</p>
                  {badgeData.certificate && (
                    <a href={badgeData.certificate} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                      View Certificate
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-muted">No badges earned yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Blood Stock Status */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-info rounded-4">
            <div className="card-body">
              <h5 className="card-title text-info mb-3">
                <i className="bi bi-droplet-half me-2"></i> Blood Stock Status - Chennai
              </h5>
              {Object.keys(bloodStock).length > 0 ? (
                <table className="table table-bordered table-hover text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Blood Group</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bloodStock).map(([group, status]) => (
                      <tr key={group}>
                        <td>{group}</td>
                        <td>
                          <span className={`badge ${status.toLowerCase() === "critical" ? "bg-danger" : "bg-success"}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No blood stock data found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Urgent Requests */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-warning rounded-4">
            <div className="card-body">
              <h5 className="card-title text-warning mb-3">
                <i className="bi bi-exclamation-triangle me-2"></i> Urgent Blood Requests
              </h5>
              {urgentRequests.length === 0 ? (
                <p className="text-muted">No urgent requests at the moment.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {urgentRequests.map((req, index) => (
                    <li key={index} className="list-group-item">
                      <h6 className="text-danger">Blood Group: {req.bloodGroup}</h6>
                      <p>🏥 {req.facilityName}</p>
                      <p>Units Needed: {req.quantityRequired}</p>
                      <p>📞 Contact: {req.contactInfo}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Campaigns */}
        <div className="col-12">
          <div className="card shadow-sm border-primary rounded-4">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">
                <i className="bi bi-megaphone me-2"></i> Upcoming Donation Campaigns
              </h5>
              {upcomingCampaigns.length === 0 ? (
                <p className="text-muted">No upcoming campaigns found.</p>
              ) : (
                <div className="row">
                  {upcomingCampaigns.map((camp, index) => (
                    <div key={index} className="col-md-4 mb-3">
                      <div className="p-3 bg-light rounded h-100">
                        <h6>{camp.title}</h6>
                        <p className="text-muted">{camp.date} | {camp.time}</p>
                        <p>📍 {camp.location}</p>
                        <p>🏢 {camp.contactInfo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default DonorDashboard;
