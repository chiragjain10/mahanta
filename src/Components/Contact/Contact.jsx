import React from "react";
import "./Contact.css";
import Breadcrumb from "./Breadcrumb";

const ContactSection = () => {
  return (
    <div>
      <Breadcrumb />
      <section className="flat-contact-section py-5" data-aos="fade-up">
        <div className="container">
          <div className="row g-5">

            {/* LEFT FORM */}
            <div className="col-lg-8" data-aos="fade-right" data-aos-delay="100">
              <div className="contact-content shadow-lg p-5 rounded-4 bg-white position-relative overflow-hidden">
                {/* Premium decorative element */}
                <div className="position-absolute top-0 end-0 bg-primary bg-opacity-10 rounded-bottom-start-5"
                  style={{ width: '120px', height: '120px' }}></div>

                <div className="position-relative">
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                      <i className="bi bi-chat-left-text-fill text-primary fs-4"></i>
                    </div>
                    <div>
                      <h4 className="contact-title mb-1 fw-bold">Contact Us</h4>
                      <p className="text-muted mb-0 premium-subtitle">
                        We are always interested in looking at the possibilities together.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted mb-4 premium-text">
                    If you have any questions or would like general information, please do not hesitate to contact us. We are happy to talk to you.
                  </p>

                  <form
                    id="contactForm"
                    method="POST"
                    action="https://homelengo.vercel.app/contact/contact-process.php"
                    className="row g-4"
                  >
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold premium-label">
                        Full Name
                      </label>
                      <div className="input-group premium-input-group">
                        <span className="input-group-text bg-transparent border-end-0">
                          <i className="bi bi-person text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control premium-input border-start-0"
                          name="name"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold premium-label">
                        Email Address
                      </label>
                      <div className="input-group premium-input-group">
                        <span className="input-group-text bg-transparent border-end-0">
                          <i className="bi bi-envelope text-muted"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control premium-input border-start-0"
                          name="email"
                          placeholder="info@mahanta.org.in"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-semibold premium-label">
                        Phone Number
                      </label>
                      <div className="input-group premium-input-group">
                        <span className="input-group-text bg-transparent border-end-0">
                          <i className="bi bi-phone text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control premium-input border-start-0"
                          name="phone"
                          placeholder="0731-4909915"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label fw-semibold premium-label">
                        Subject
                      </label>
                      <div className="input-group premium-input-group">
                        <span className="input-group-text bg-transparent border-end-0">
                          <i className="bi bi-tag text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control premium-input border-start-0"
                          name="subject"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label fw-semibold premium-label">
                        Your Message
                      </label>
                      <div className="premium-textarea-container">
                        <textarea
                          className="form-control premium-textarea"
                          name="message"
                          rows="6"
                          placeholder="Tell us about your project or inquiry..."
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12 text-start pt-2">
                      <button className="btn premium-send-btn px-5 py-3 rounded-3 fw-semibold">
                        <i className="bi bi-send-fill me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="150">
              <div className="contact-info card border-0 shadow-lg p-4 rounded-4 h-100 premium-info-card">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                    <i className="bi bi-geo-alt-fill text-primary fs-4"></i>
                  </div>
                  <div>
                    <h4 className="contact-title mb-1 fw-bold">Get In Touch</h4>
                    <p className="text-muted mb-0 premium-subtitle">We are happy to talk to you</p>
                  </div>
                </div>

                <ul className="list-unstyled info-list">

                  <li className="mb-4 pb-3 border-bottom border-light" data-aos="fade-up" data-aos-delay="200">
                    <div className="d-flex">
                      <div className="me-3 mt-1">
                        <i className="bi bi-geo-alt text-primary fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold premium-info-title">Our Location</h6>
                        <p className="text-muted mb-0 premium-info-text">
                          405 - Shagun Tower, Above Apna Sweets,<br />
                          AB Road, Vijay Nagar, Indore, 452001
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="mb-4 pb-3 border-bottom border-light">
                    <div className="d-flex">
                      <div className="me-3 mt-1">
                        <i className="bi bi-telephone text-primary fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold premium-info-title">Contact Information</h6>
                        <p className="text-muted mb-1 premium-info-text">
                          <span className="d-block">Call Us: 0731-4909915</span>
                          <span className="d-block">Email Us: info@mahanta.org.in</span>
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h6 className="fw-bold premium-info-title mb-3">Follow Our Journey</h6>
                    <div className="d-flex gap-3 align-items-center social-icons">

                      <a
                        href="https://www.facebook.com/profile.php?id=61581331928145"
                        className="social-item premium-social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>

                      <a
                        href="https://www.instagram.com/mahantagroup/"
                        className="social-item premium-social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>

                      {/* <a
                        href="#"
                        className="social-item premium-social"
                        aria-label="YouTube"
                      >
                        <i className="bi bi-youtube"></i>
                      </a> */}

                      <a
                        href="https://www.linkedin.com/company/mahanta-group/"
                        className="social-item premium-social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>

                      <a
                        href="#"
                        className="social-item premium-social"
                        aria-label="Twitter"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>

                    </div>
                  </li>


                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;