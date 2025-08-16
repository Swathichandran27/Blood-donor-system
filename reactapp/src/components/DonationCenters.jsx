import React, { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col, Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Navigate, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix Leaflet marker issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DonationCenters = () => {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default: India center
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCenters();
  }, []);

 const fetchCenters = async (query = "") => {
  try {
    setLoading(true);
    let url = "http://localhost:8080/api/donationCenters";

    if (query) {
      // check if query is number -> assume pincode
      if (/^\d+$/.test(query)) {
        url = `http://localhost:8080/api/donationCenters/search/pincode?pincode=${query}`;
      } else {
        url = `http://localhost:8080/api/donationCenters/search/city?city=${query}`;
      }
    }

    let res = await axios.get(url);
    setCenters(res.data);
  } catch (err) {
    console.error("Error fetching centers", err);
  } finally {
    setLoading(false);
  }
};


  const handleSearch = (e) => {
    e.preventDefault();
    fetchCenters(search);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        // Backend should support nearest centers by lat/lng
        fetchCenters(`${pos.coords.latitude},${pos.coords.longitude}`);
      });
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-center">Find Blood Donation Centers</h2>

      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="mb-3">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter City or Pincode"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              className="w-100"
              onClick={handleUseLocation}
            >
              Use My Location
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Map */}
      <div style={{ height: "400px", width: "100%" }} className="mb-4">
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {centers.map((center) => (
            <Marker
              key={center.id}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.name}</strong> <br />
                {center.address} <br />
                📞 {center.contactNumber} <br />
                ⏰ {center.operatingHours} <br />
                🩸 Accepts: {center.acceptedBloodGroups.join(", ")} <br />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* List View */}
      <Row>
        {loading && <p>Loading centers...</p>}
        {!loading && centers.length === 0 && <p>No centers found.</p>}
        {centers.map((center) => (
          <Col md={4} key={center.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{center.name}</Card.Title>
                <Card.Text>
                  📍 {center.address} <br />
                  City: {center.city} | Pincode: {center.pincode} <br />
                  📞 {center.contactNumber} <br />
                  ⏰ {center.operatingHours} <br />
                  🩸 {center.acceptedBloodGroups.join(", ")}
                </Card.Text>
               

                  <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`}
                    target="_blank"
                  >
                    Get Directions
                  </Button>
                    <Button
                    variant="danger"
                    size="sm"
                    onClick={() => navigate("/eligibility", { state: { centerId: center.id } })}
                    >
                    Book Appointment
                    </Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DonationCenters;
