import React from 'react';
import { FaBullseye, FaEye } from 'react-icons/fa';
import './About.css';

const MissionVision = () => {
  return (
    <section className="about-mission container">
      <div className="box-title text-center wow fadeInUp">
        <div className="text-subtitle text-primary">Mission &amp; Vision</div>
        <h3 className="mt-4 title">Clarity, consistency, and customer-first intelligence.</h3>
      </div>

      <div className="mv-grid">
        <article className="mv-card">
          <div className="mv-icon">
            <FaBullseye />
          </div>
          <h3>Our Mission</h3>
          <p>
            Our mission is to redefine the real estate experience in Indore. We leverage our deep local market
            expertise and client-centric solutions to ensure your property journey is transparent, reliable, and easy.
            We partner with you every step of the way to turn your property dreams into a lasting reality.
          </p>
        </article>

        <article className="mv-card">
          <div className="mv-icon">
            <FaEye />
          </div>
          <h3>Our Vision</h3>
          <p>
            Our vision is clear: to become the most trusted and preferred name in Indore’s competitive real estate
            industry. We aim to create a platform where every family and business can easily find the best property
            options that perfectly suit their unique needs and aspirations.
          </p>
        </article>
      </div>
    </section>
  );
};

export default MissionVision;
