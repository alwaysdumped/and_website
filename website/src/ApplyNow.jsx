// src/ApplyNow.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyNow = () => { // MODIFIED: Renamed component
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    phone: "",
    domain: [],
    otherDomain: "",
  });

  const domainOptions = ["Sketching", "Painting","Crafts", "Wood-working", "Metal-Working", "Other"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => {
        const newDomains = [...prevFormData.domain];
        if (checked) {
          newDomains.push(value);
        } else {
          const index = newDomains.indexOf(value);
          if (index > -1) {
            newDomains.splice(index, 1);
          }
        }
        return { ...prevFormData, domain: newDomains };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendEndpoint = "http://localhost:3001/api/submit-to-google-sheet";

    try {
      const response = await fetch(backendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the submission.");
      }

      console.log("Form submitted successfully:", formData);
      alert("✅ Application successful!"); // MODIFIED: Updated alert message
      navigate("/");

    } catch (error) {
      console.error("Submission Error:", error);
      alert("❌ There was a problem with your submission. Please try again.");
    }
  };

  return (
    <>
      {/* MODIFIED: Updated title */}
      <title>Apply Now - Arts & Deco</title>
      <meta name="description" content="Apply to join the Department of Arts & Deco community." />

      {/* MODIFIED: Renamed classNames for consistency */}
      <div className="apply-now-container">
        <div className="apply-now-image-panel">
          <div className="image-panel-content">
            <h1>Join Our Community</h1>
            <p>Discover and create with the best artists and designers.</p>
          </div>
        </div>

        <div className="apply-now-form-panel">
          <form className="apply-now-form" onSubmit={handleSubmit}>
            {/* MODIFIED: Updated heading */}
            <h2>Apply Now</h2>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>ID Number</label>
              <input type="text" name="id" placeholder="Enter your ID" value={formData.id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Domain of Interest</label>
              <div className="checkbox-group">
                {domainOptions.map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="domain"
                      value={option.toLowerCase()}
                      checked={formData.domain.includes(option.toLowerCase())}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            {formData.domain.includes("other") && (
              <div className="form-group">
                <label>If Other, please specify:</label>
                <input
                  type="text"
                  name="otherDomain"
                  placeholder="Your domain of interest"
                  value={formData.otherDomain}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {/* MODIFIED: Updated button text and className */}
            <button type="submit" className="apply-now-submit">Apply Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyNow;