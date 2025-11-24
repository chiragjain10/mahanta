import React from "react";
// import "./MissionVision.css";
import { FaBullseye, FaEye } from "react-icons/fa";

const MissionVision = () => {
  return (
    <section className="mv-section">
      <div className="mv-container">
        <div className="mv-header">
          <h2>Our Mission & Vision</h2>
          <p>
            At Mahanta Group, we believe in building more than properties — 
            we build trust, value, and long-lasting relationships.
          </p>
        </div>

        <div className="mv-grid">
          {/* Mission */}
          <div className="mv-card">
            <div className="mv-icon">
              <FaBullseye />
            </div>
            <h3>Our Mission</h3>
            <p>
              To deliver high-quality real estate solutions that combine 
              innovation, transparency, and customer-centric service. 
              Our mission is to provide properties that elevate lifestyles 
              and offer sustainable value to individuals, families, and businesses.
            </p>
          </div>

          {/* Vision */}
          <div className="mv-card">
            <div className="mv-icon">
              <FaEye />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become one of the most trusted and leading real estate 
              brands in the nation by setting new benchmarks in design, 
              quality, affordability, and commitment — shaping a better 
              future for modern living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
