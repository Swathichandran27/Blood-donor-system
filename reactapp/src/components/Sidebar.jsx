import React from "react";
import { 
  FaHome, 
  FaCalendarAlt, 
  FaTint, 
  FaTrophy, 
  FaBell, 
  FaUser, 
  FaQuestionCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.fullName || "Guest"; 
  const donorStatus = storedUser?.status || "Donor"; 

  const menuItems = [
    { path: "/donor/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/donationcenter", icon: <FaHome />, label: "Donation Centers" }, 
    { path: "/manage-appointments", icon: <FaCalendarAlt />, label: "Appointments" },
    { path: "/UrgentRequest", icon: <FaTint />, label: "Urgent Requests" },
    { path: "/badges", icon: <FaTrophy />, label: "My Badges" },
    { path: "/resources", icon: <FaBell />, label: "Resources" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/chatwithcenter", icon: <FaQuestionCircle />, label: "Help" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // redirect to home/login page
  };

  return (
    <motion.div 
      className="sidebar"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <FaTint className="blood-icon" /> BloodConnect
        </h2>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <motion.li
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={item.path} 
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name">{username}</div>
            <div className="user-status">{donorStatus}</div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          className="btn btn-outline-danger w-100 mt-3"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
