import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Badges = () => {
  const [gamification, setGamification] = useState(null);

  // 👇 Get userId from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/gamification/${userId}`)
      .then(res => setGamification(res.data))
      .catch(err => console.error("Error fetching gamification:", err));
  }, [userId]);

  if (!userId) return <div className="container mt-4"><p>No user logged in.</p></div>;
  if (!gamification) return <div className="container mt-4"><p>Loading gamification...</p></div>;

  // 👇 Determine progress to next badge
  const currentPoints = gamification.totalPoints;
  const donationCount = currentPoints / 10;

  let nextLevel = "";
  let progressTarget = 0;

  if (donationCount < 1) {
    nextLevel = "Bronze (1 donation)";
    progressTarget = 1;
  } else if (donationCount < 5) {
    nextLevel = "Silver (5 donations)";
    progressTarget = 5;
  } else if (donationCount < 10) {
    nextLevel = "Gold (10 donations)";
    progressTarget = 10;
  } else {
    nextLevel = "Max Level Achieved 🎉";
    progressTarget = donationCount; // no more levels
  }

  const progressPercent = Math.min((donationCount / progressTarget) * 100, 100);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🎖 My Achievements</h2>

        <div className="text-center mb-4">
          <h4>Current Badge: <span className="badge bg-primary">{gamification.badge}</span></h4>
          <h5>Level: {gamification.level}</h5>
          {gamification.certificate && (
            <div className="mt-3">
              <p><strong>Certificate:</strong> {gamification.certificate}</p>
              <button className="btn btn-outline-success">Download Certificate</button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h5>Donation Progress</h5>
          <div className="progress" style={{ height: "25px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.floor(progressPercent)}%
            </div>
          </div>
          <p className="mt-2 text-center">
            {donationCount} / {progressTarget} donations for next level ({nextLevel})
          </p>
        </div>

        <div className="text-center">
          <button className="btn btn-primary">Keep Donating ❤️</button>
        </div>
      </div>
    </div>
  );
};

export default Badges;
