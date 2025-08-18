import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    phone: "",
    domain: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (!formData.name || !formData.email || !formData.id || !formData.phone || !formData.domain) {
      alert("Please fill all fields.");
      return;
    }

    // Here you could send data to backend / API
    console.log("Form submitted:", formData);

    alert("✅ Sign up successful!");
    navigate("/"); // redirect back to home
  };

  return (
    <section className="signup">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ID Number</label>
          <input
            type="text"
            name="id"
            placeholder="Enter your ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Domain of Interest</label>
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          >
            <option value="">Select domain</option>
            <option value="arts">Arts</option>
            <option value="design">Design</option>
            <option value="media">Media</option>
            <option value="tech">Tech</option>
          </select>
        </div>

        <button type="submit" className="signup-submit">Submit</button>
      </form>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </section>
  );
};

export default SignUp;
