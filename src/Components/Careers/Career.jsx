import React, { useState } from "react";
import "./Career.css";

// IMPORT REACT ICONS
import {
    FaBriefcase, FaChartLine, FaBullhorn, FaUsers, FaCoins,
    FaUserTie, FaExternalLinkAlt, FaArrowRight
} from "react-icons/fa";

import { MdBusinessCenter, MdAdminPanelSettings } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { PiBagSimpleFill } from "react-icons/pi";

export default function Career() {
    const [selectedJob, setSelectedJob] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [appliedJob, setAppliedJob] = useState("");


    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf.../viewform";

    const openGoogleForm = (jobTitle) => {
        setSelectedJob(jobTitle);
        window.open(googleFormUrl, "_blank");
    };

    const section1 = [
        { title: "Sales Executive", department: "Sales" },
        { title: "Business Manager", department: "Sales" },
        { title: "Vice President", department: "Executive" }
    ];

    const section2 = {
        "Back Office": [
            { title: "Back Office Executive", description: "Manage backend operations and support" }
        ],
        "Front Desk & Admin": [
            { title: "Front Desk & Admin Executive", description: "First point of contact and administrative support" }
        ],
        "Accounts Department": [
            { title: "Accounts Executive", description: "Financial operations and bookkeeping" },
            { title: "Account Manager (Junior/Senior)", description: "Client account management" },
            { title: "Collection Coordinator", description: "Payment collections and follow-ups" }
        ],
        "Sales Department": [
            { title: "Sales Executive", description: "Real estate sales and client acquisition" },
            { title: "Business Manager", description: "Sales team leadership" },
            { title: "Pre-Sales Coordinator", description: "Lead qualification and appointment setting" }
        ],
        "HR Department": [
            { title: "Recruiter", description: "Talent acquisition and recruitment" },
            { title: "Counselor", description: "Employee guidance and support" },
            { title: "HR Manager", description: "HR operations and strategy" }
        ],
        "IT Department": [
            { title: "Digital Marketing Specialist", description: "Online marketing campaigns" },
            { title: "Graphics Designer", description: "Visual content creation" },
            { title: "Content Writer", description: "Marketing and web content" },
            { title: "Tech Support Specialist", description: "Technical support and maintenance" },
            { title: "Video Editor", description: "Video content production" },
            { title: "Influencers", description: "Brand promotion and social media" }
        ]
    };

    const benefits = [
        {
            title: "High Commission & Incentives",
            description: "Industry-leading commission structure and bonuses.",
            icon: <FaCoins />
        },
        {
            title: "Premium Inventory Access",
            description: "Work with prime residential & commercial projects.",
            icon: <HiBuildingOffice2 />
        },
        {
            title: "Accelerated Career Growth",
            description: "Clear career paths and mentorship.",
            icon: <FaChartLine />
        },
        {
            title: "Modern Marketing Campaigns",
            description: "Cutting-edge digital strategies for quality leads.",
            icon: <FaBullhorn />
        },
        {
            title: "Collaborative Culture",
            description: "Motivated team environment for high achievement.",
            icon: <FaUsers />
        }
    ];
    // POPUP FORM COMPONENT
    const PopupForm = ({ isOpen, close, job }) => {
        if (!isOpen) return null;

        return (
            <div className="career-modal-backdrop">
                <div className="career-modal">
                    <button className="career-close-btn" onClick={close}>×</button>

                    <h2 className="career-form-title">Career Form</h2>

                    <form className="career-form">
                        <div className="career-row">
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                        </div>

                        <div className="career-row">
                            <input type="email" placeholder="Email-id" />
                            <input type="text" placeholder="Contact No." />
                        </div>

                        <div className="career-row">
                            <input type="date" />
                            <input type="text" placeholder="Experience" />
                        </div>

                        <input type="text" placeholder="Applied for the post of" defaultValue={job} />

                        <label className="career-label">Resume / CV</label>
                        <input type="file" className="career-file" />

                        <div className="career-row">
                            <label className="career-checkbox">
                                <input type="checkbox" /> I'm not a robot
                            </label>

                            <label className="career-checkbox">
                                <input type="checkbox" /> copy to me
                            </label>
                        </div>

                        <div className="career-btn-group">
                            <button type="submit" className="career-submit">Submit</button>
                            <button type="reset" className="career-reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <>
            <style>{`
                .premium-hero-career {
                    position: relative;
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #0A2540 0%, #061B2E 100%);
                    overflow: hidden;
                    margin-top: 33px;
                }

                .premium-hero-career::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 50%, rgba(201, 169, 110, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
                }

                .hero-content-career {
                    position: relative;
                    z-index: 2;
                    padding: 6rem 0;
                    text-align: center;
                }

                .hero-title-career {
                    font-size: 4.5rem;
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: white;
                    margin-bottom: 1.5rem;
                    font-family: 'Georgia', serif;
                }

                .hero-title-career strong {
                    font-weight: 600;
                    color: #1174d6;
                }

                .director-container-career {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                @media (max-width: 992px) {
                    .hero-title-career {
                        font-size: 3.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-title-career {
                        font-size: 2.8rem;
                    }
                }
            `}</style>

            {/* HERO SECTION */}
            <section className="premium-hero-career">
                <div className="director-container-career">
                    <div className="hero-content-career">
                        <h1 className="hero-title-career">
                            Join Our <strong>Team</strong>
                        </h1>
                        <p className="text-white text-lg opacity-80" style={{ fontSize: '1.25rem', letterSpacing: '0.5px', marginBottom: '1rem' }}>
                            Guiding Mahanta Group with wisdom, integrity, and forward-thinking vision
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="career-intro">
                <div className="container">
                    <div className="intro-content">
                        <h2>Current Openings</h2>
                        <p className="intro-text">
                            Explore the latest job openings and start your career journey with us.
                        </p>


                    </div>
                </div>
            </section>

            {/* SECTION 1 */}
            <section className="career-section section-1">
                <div className="container">
                    <h2 className="section-title">Featured Openings</h2>

                    <div className="jobs-grid">
                        {section1.map((job, index) => (
                            <div className="job-card" key={index}>
                                <div className="card-header">
                                    <div className="job-badge">{job.department}</div>
                                    <div className="job-icon">
                                        <FaBriefcase />
                                    </div>
                                </div>

                                <h3 className="job-title">{job.title}</h3>
                                {/* <p className="job-location">Mumbai, Pune, Delhi</p> */}

                                <button
                                    className="apply-button"
                                    onClick={() => {
                                        setAppliedJob(job.title);
                                        setShowForm(true);
                                    }}

                                >
                                    Apply Now <FaArrowRight />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="career-section section-2">
                <div className="container">
                    <h2 className="section-title">Departments & Roles</h2>

                    {Object.entries(section2).map(([department, jobs], idx) => (
                        <div className="department-section" key={idx}>
                            <div className="department-header">
                                <h3>{department}</h3>
                                <span className="job-count">{jobs.length} roles</span>
                            </div>

                            <div className="jobs-grid">
                                {jobs.map((job, i) => (
                                    <div className="job-card" key={i}>
                                        <div className="card-header">
                                            <div className="job-badge">{department.split(" ")[0]}</div>
                                            <div className="job-icon">
                                                <MdBusinessCenter />
                                            </div>
                                        </div>

                                        <h3 className="job-title">{job.title}</h3>
                                        <p className="job-description">{job.description}</p>

                                        <button
                                            className="apply-button"
                                            onClick={() => {
                                                setAppliedJob(job.title);
                                                setShowForm(true);
                                            }}

                                        >
                                            Apply Now <FaArrowRight />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BENEFITS */}
            <section className="why-join-section">
                <div className="container">
                    <h2 className="section-title">Why Join Us?</h2>

                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div className="benefit-card" key={index}>
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cta-section">
                        <h3>Ready to Apply?</h3>
                        <button
                            className="cta-button"
                            onClick={() => window.open(googleFormUrl, "_blank")}
                        >
                            Apply Through Google Form <FaExternalLinkAlt />
                        </button>
                    </div>
                </div>
            </section>
            <PopupForm
                isOpen={showForm}
                close={() => setShowForm(false)}
                job={appliedJob}
            />

        </>
    );

}

