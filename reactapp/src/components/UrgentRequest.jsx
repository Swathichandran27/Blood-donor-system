/*import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box
} from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

// Mock urgent requests data
const urgentRequests = [
  {
    id: 1,
    bloodType: "O-",
    location: "City Hospital, Downtown",
    neededBy: "2025-08-12",
    urgency: "High"
  },
  {
    id: 2,
    bloodType: "A+",
    location: "Green Valley Medical Center",
    neededBy: "2025-08-13",
    urgency: "Medium"
  },
  {
    id: 3,
    bloodType: "B-",
    location: "Red Cross Center, Midtown",
    neededBy: "2025-08-14",
    urgency: "High"
  }
];

export default function UrgentRequests() {
  const getUrgencyColor = (level) => {
    switch (level) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        background: "linear-gradient(135deg, #fff0f0, #ffe5e5)"
      }}
    >
      <style>
        {`
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.6); }
            70% { box-shadow: 0 0 15px 10px rgba(211, 47, 47, 0); }
            100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
          }
        `}
      </style>

      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#b71c1c",
          mb: 4
        }}
      >
        🩸 Urgent Blood Requests
      </Typography>

      <Grid container spacing={3}>
        {urgentRequests.map((req) => (
          <Grid item xs={12} sm={6} md={4} key={req.id}>
            <Card
              sx={{
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                border: req.urgency === "High" ? "2px solid #d32f2f" : "none",
                animation:
                  req.urgency === "High"
                    ? "pulseGlow 1.5s infinite ease-out"
                    : "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
                }
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <BloodtypeIcon
                    sx={{
                      color: "#d32f2f",
                      fontSize: "2rem",
                      mr: 1
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#c62828"
                    }}
                  >
                    {req.bloodType}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ marginBottom: "0.5rem", fontWeight: 500 }}
                >
                  📍 {req.location}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Needed by:{" "}
                  <strong style={{ color: "#e53935" }}>{req.neededBy}</strong>
                </Typography>

                <Chip
                  label={req.urgency + " Priority"}
                  color={getUrgencyColor(req.urgency)}
                  sx={{
                    fontWeight: "bold",
                    px: 1
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import L from "leaflet";
import Sidebar from "./Sidebar";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const UrgentRequests = () => {
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  // Fetch urgent requests
  const fetchUrgentRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/urgent-requests/all");
      setUrgentRequests(res.data || []);
    } catch (err) {
      setError("Failed to load urgent requests.");
    } finally {
      setLoading(false);
    }
  };

  // Filter urgent requests
  const filterRequests = async () => {
    if (!bloodGroup && !location) {
      fetchUrgentRequests();
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/urgent-requests/filter`,
        { params: { bloodGroup, location } }
      );
      setUrgentRequests(res.data || []);
    } catch (err) {
      setError("Failed to filter urgent requests.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch blood stock for Chennai
  
  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      


      {/* Main Content */}
      <div className="container py-4">
        <h2 className="mb-4">🆘 Urgent Blood Requests</h2>

        {/* Filter Section */}
        <Card className="mb-4 p-3 shadow-sm">
          <Row>
            <Col md={4}>
              <Form.Select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Button variant="danger" onClick={filterRequests} className="w-100">
                Filter
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Loader */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : urgentRequests.length === 0 ? (
          <p className="text-muted">No urgent requests at the moment.</p>
        ) : (
          <>
            {urgentRequests.map((req) => (
              <Card key={req.id} className="mb-3 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>
                    Blood Group:{" "}
                    <span
                      style={{
                        color:
                          req.bloodGroup === "O-" || req.bloodGroup === "AB-"
                            ? "red"
                            : "#333",
                        fontWeight: "bold",
                      }}
                    >
                      {req.bloodGroup}
                    </span>
                  </Card.Title>
                  <Card.Text>
                    <strong>Hospital:</strong> {req.hospitalName || "Not specified"} <br />
                    <strong>Location:</strong> {req.location} <br />
                    <strong>Reason:</strong> {req.reason || "N/A"} <br />
                    <strong>Urgency Level:</strong> {req.urgencyLevel || "Normal"}
                  </Card.Text>
                  <Button variant="outline-danger" size="sm">
                    📞 Contact Now
                  </Button>
                </Card.Body>
              </Card>
            ))}

            {/* Map View */}
            <Card className="mt-4">
              <Card.Header>Hospital Locations</Card.Header>
              <Card.Body style={{ height: "400px" }}>
                <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  />
                  {urgentRequests.map((req, index) => {
                    if (!req.latitude || !req.longitude) return null;
                    return (
                      <Marker key={index} position={[req.latitude, req.longitude]}>
                        <Popup>
                          <strong>{req.hospitalName}</strong> <br />
                          {req.location} <br />
                          Blood Needed: {req.bloodGroup}
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
      </div>
    
  );
};

export default UrgentRequests;
