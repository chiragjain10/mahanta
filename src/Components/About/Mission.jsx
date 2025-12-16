import React from "react";
import "./Mission.css";

const VisionMissionPage = () => {
  return (
    <section className="vm-wrapper container-fluid">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-6">
            <div className="vm-left">

              <h2 className="vm-title">
                <span className="vm-title-main">Our Vision</span>
                <span className="vm-title-sep">&</span>
                <span className="vm-title-sub">Mission</span>
              </h2>

              <p className="vm-desc">
                To empower businesses globally through intelligent digital
                solutions that accelerate growth, inspire trust, and create
                long-term value.
              </p>

              <p className="vm-desc">
                Our mission is to build a future-ready ecosystem driven by
                innovation, transparency, and a relentless customer-first
                mindset.
              </p>

              <div className="vm-year-card">
                <span className="vm-year-label">Target Year</span>
                <span className="vm-year-value">2027</span>
              </div>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="col-lg-6">
            <div className="row g-4">

              <div className="col-md-6">
                <div className="vm-stat highlight">
                  <i className="bi bi-calendar-event"></i>
                  <h3>27</h3>
                  <p>Years of Excellence</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="vm-stat">
                  <i className="bi bi-award"></i>
                  <h3>2</h3>
                  <p>Global Awards</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="vm-stat">
                  <i className="bi bi-people"></i>
                  <h3>20K+</h3>
                  <p>Business Partners</p>
                  <span className="vm-badge">Satisfied</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="vm-stat">
                  <i className="bi bi-gear"></i>
                  <h3>10K+</h3>
                  <p>Core Solutions</p>
                </div>
              </div>

             

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMissionPage;
