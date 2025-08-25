// src/ApplyNow.jsx
import React, { useState } from "react";

const ApplyNow = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
      setFormData((prev) => {
        const newDomains = [...prev.domain];
        if (checked) {
          newDomains.push(value);
        } else {
          const index = newDomains.indexOf(value);
          if (index > -1) newDomains.splice(index, 1);
        }
        
        if (value === 'other' && !newDomains.includes('other')) {
          return { ...prev, domain: newDomains, otherDomain: '' };
        }

        return { ...prev, domain: newDomains };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/submit-to-google-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitted(true);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("❌ There was an error submitting your application. Please try again.");
    }
  };

  return (
    <>
      <title>Apply Now - Arts & Deco</title>
      <meta name="description" content="Apply to join the Department of Arts & Deco community." />

      <div className="apply-now-page-container">
        <div className="image-section">
          {/* This div is now dedicated to the background image to fix the error */}
          <div 
            className="image-section-bg" 
            style={{ backgroundImage: `url('/images/thope.png')` }}
          ></div>
          <h1 className="image-section-text">Join Us</h1>
        </div>

        <div className="form-section">
          <form className="apply-now-form" onSubmit={handleSubmit}>
            {/* ... form content remains the same ... */}
            <div className="title">Apply Now</div>
            
            <input className="form-input" placeholder="Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            <input className="form-input" name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
            <input className="form-input" name="id" placeholder="ID Number" type="text" value={formData.id} onChange={handleChange} required />
            <input className="form-input" name="phone" placeholder="Phone" type="tel" value={formData.phone} onChange={handleChange} required />

            <div className="form-group-condensed">
              <label>Domain of Interest</label>
              <div className="checklist">
                {domainOptions.map((option) => {
                  const optionValue = option.toLowerCase().replace('-', '');
                  return (
                    <div className="checklist-item" key={option}>
                      <input 
                        value={optionValue} 
                        name="domain" 
                        type="checkbox" 
                        id={optionValue}
                        checked={formData.domain.includes(optionValue)}
                        onChange={handleChange}
                      />
                      <label htmlFor={optionValue}>{option}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {formData.domain.includes('other') && (
              <input 
                className="form-input" 
                name="otherDomain" 
                placeholder="Please specify your domain" 
                type="text" 
                value={formData.otherDomain} 
                onChange={handleChange} 
                required 
              />
            )}
            
            {!isSubmitted ? (
              <button className="form-btn">Submit</button>
            ) : (
              <p className="form-success-message">
                <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                Application successful!
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyNow;