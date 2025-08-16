import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // 👇 Get userId from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(res => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error("Error fetching user:", err));
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/users/${userId}`, formData)
      .then(res => {
        setUser(res.data);
        setIsEditing(false);
      })
      .catch(err => console.error("Error updating user:", err));
  };

  if (!userId) return <div className="container mt-4"><p>No user logged in.</p></div>;
  if (!user) return <div className="container mt-4"><p>Loading profile...</p></div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">User Profile</h2>

        {isEditing ? (
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                className="form-control"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Blood Group</label>
              <input
                className="form-control"
                name="bloodGroup"
                value={formData.bloodGroup || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <ul className="list-group mb-3">
              <li className="list-group-item"><strong>Name:</strong> {user.fullName}</li>
              <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
              <li className="list-group-item"><strong>Gender:</strong> {user.gender}</li>
              <li className="list-group-item"><strong>DOB:</strong> {user.dateOfBirth}</li>
              <li className="list-group-item"><strong>Blood Group:</strong> {user.bloodGroup}</li>
              <li className="list-group-item"><strong>Address:</strong> {user.address}</li>
              <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
              <li className="list-group-item"><strong>Total Donations:</strong> {user.totalDonations}</li>
              <li className="list-group-item"><strong>Referral Points:</strong> {user.referralPoints}</li>
            </ul>

            <div className="text-center">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
