import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExternalLinkAlt, FaFileAlt, FaVideo } from "react-icons/fa";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8080/resources"; // update to your actual endpoint

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <p>Loading resources...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Educational Resources</h2>
      {resources.length === 0 ? (
        <p>No resources available at the moment.</p>
      ) : (
        <div className="row">
          {resources.map((res) => (
            <div key={res.id} className="col-md-6 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{res.title}</h5>
                  {res.type === "article" && (
                    <p className="card-text">{res.content}</p>
                  )}
                  {res.type === "video" && (
                    <a
                      href={res.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <FaVideo className="me-2" /> Watch Video
                    </a>
                  )}
                  {res.type === "faq" && (
                    <p className="card-text text-muted">{res.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
