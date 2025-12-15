import React, { useState } from "react";
import "./Career.css";

// IMPORTING ALL NECESSARY ICONS
import {
    FaExternalLinkAlt, FaHandshake, FaBullseye, FaUserTie,
    FaBuilding, FaFileInvoiceDollar, FaMoneyCheckAlt, FaChartLine,
    FaUsers, FaPhoneAlt, FaUserCheck, FaComments, FaUserCog,
    FaSearchDollar, FaPalette, FaFeatherAlt, FaHeadset, FaVideo, FaHeart,
    FaCoins, FaRocket, FaPaperPlane
} from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export default function Career() {
    const [showPartnerJobs, setShowPartnerJobs] = useState(false);
    const [showTeamJobs, setShowTeamJobs] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [appliedJob, setAppliedJob] = useState("");

    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf.../viewform";

    const businessPartnerOpenings = [
        { title: "Sales Executive", department: "Business Partner", icon: <FaHandshake /> },
        { title: "Business Manager", department: "Business Partner", icon: <FaBullseye /> },
        { title: "Vice President", department: "Business Partner", icon: <FaUserTie /> }
    ];

    const teamOpenings = {
        "Back Office": [
            { title: "Back Office Executive", icon: <FaBuilding /> }
        ],
        "Accounts": [
            { title: "Account Manager (Jr/Sr)", icon: <FaFileInvoiceDollar /> },
            { title: "Collection Coordinator", icon: <FaMoneyCheckAlt /> }
        ],
        "Sales": [
            { title: "Sales Executive", icon: <FaChartLine /> },
            { title: "Business Manager", icon: <FaUsers /> },
            { title: "Pre-Sales Coordinator", icon: <FaPhoneAlt /> }
        ],
        "HR": [
            { title: "Recruiter", icon: <FaUserCheck /> },
            { title: "Counselor", icon: <FaComments /> },
            { title: "HR Manager", icon: <FaUserCog /> }
        ],
        "IT": [
            { title: "Digital Marketing Specialist", icon: <FaSearchDollar /> },
            { title: "Graphics Designer", icon: <FaPalette /> },
            { title: "Content Writer", icon: <FaFeatherAlt /> },
            { title: "Tech Support Specialist", icon: <FaHeadset /> },
            { title: "Video Editor", icon: <FaVideo /> },
            { title: "Influencers", icon: <FaHeart /> }
        ]
    };

    const handleApply = (title) => {
        setAppliedJob(title);
        setShowForm(true);
    };

    return (
        <div className="career-page-wrapper">
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
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at 20% 50%, rgba(201, 169, 110, 0.15) 0%, transparent 50%);
                }
                .hero-content-career { position: relative; z-index: 2; padding: 6rem 0; text-align: center; }
                .hero-title-career { font-size: 4.5rem; font-weight: 300; color: white; margin-bottom: 1.5rem; font-family: 'Georgia', serif; }
                .hero-title-career strong { font-weight: 600; color: #1174d6; }
                .director-container-career { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
            `}</style>

            {/* HERO SECTION */}
            <section
            className="mt-5 pt-3"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "60vh",
                    overflow: "hidden"
                }}
            >
                {/* Background Image */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url(/images/img/bnr.jpeg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat"
                    }}
                />

                {/* Light Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(0,0,0,0.15))"
                    }}
                />
            </section>



            {/* SECTION 1: JOIN AS BUSINESS PARTNER */}
            <section className="career-intro-section container">
                <div className="intro-content text-center">
                    <h2 className="section-main-title">Join as Business Partner</h2>
                    <p className="intro-description">
                        Join one of India’s fastest-growing real estate sales and marketing platforms.
                        This is a profit-sharing partnership where your income grows with your performance.
                    </p>
                    <button className="career-toggle-btn" onClick={() => setShowPartnerJobs(!showPartnerJobs)}>
                        {showPartnerJobs ? "Hide Openings" : "Join as Business Partner"}
                    </button>
                </div>

                {showPartnerJobs && (
                    <div className="jobs-grid partner-grid animated-fade">
                        {businessPartnerOpenings.map((job, i) => (
                            <div className="compact-job-card" key={i}>
                                <div className="card-top">
                                    <span className="compact-badge">Partner</span>
                                    <div className="job-icon-box">{job.icon}</div>
                                </div>
                                <h3>{job.title}</h3>
                                <button onClick={() => handleApply(job.title)}>Apply Now</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* SECTION 2: JOIN AS TEAM */}
            <section className="career-intro-section container section-divider-top">
                <div className="intro-content text-center">
                    <h2 className="section-main-title">Join as Team</h2>
                    <p className="intro-description">
                        Are you driven and ready to elevate your career? We’re looking for dedicated professionals
                        passionate about property goals.
                    </p>
                    <button className="career-toggle-btn" onClick={() => setShowTeamJobs(!showTeamJobs)}>
                        {showTeamJobs ? "Hide Roles" : "Join as Team"}
                    </button>
                </div>

                {showTeamJobs && (
                    <div className="team-container animated-fade">
                        {Object.entries(teamOpenings).map(([dept, jobs], idx) => (
                            <div className="dept-group" key={idx}>
                                <h4 className="dept-label">{dept}</h4>
                                <div className="jobs-grid team-grid">
                                    {jobs.map((job, i) => (
                                        <div className="compact-job-card" key={i}>
                                            <div className="job-icon-box">{job.icon}</div>
                                            <h3>{job.title}</h3>
                                            <button onClick={() => handleApply(job.title)}>Apply Now</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* WHY JOIN US SECTION */}
            <section className="why-join-section">
                <div className="container">
                    <h2 className="section-title">Why Join Us?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon"><FaCoins /></div>
                            <h3>High Commission & Incentives</h3>
                            <p>Industry-leading commission structure and bonuses.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><HiOutlineOfficeBuilding /></div>
                            <h3>Premium Inventory Access</h3>
                            <p>Work with prime residential & commercial projects.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><FaRocket /></div>
                            <h3>Accelerated Career Growth</h3>
                            <p>Clear career paths and mentorship.</p>
                        </div>
                    </div>

                    <div className="cta-section">
                        <h3>Ready to Apply?</h3>
                        <button className="cta-button" onClick={() => window.open(googleFormUrl, "_blank")}>
                            Apply Through Google Form <FaExternalLinkAlt />
                        </button>
                    </div>
                </div>
            </section>

            {/* MODAL FORM */}
            {showForm && (
                <div className="career-modal-backdrop" onClick={() => setShowForm(false)}>
                    <div className="career-modal-premium" onClick={e => e.stopPropagation()}>
                        <button className="close-x" onClick={() => setShowForm(false)}>&times;</button>
                        <div className="modal-top">
                            <div className="modal-icon-wrap"><FaPaperPlane /></div>
                            <h2>Application Form</h2>
                            <p className="applying-for">Post: <span>{appliedJob}</span></p>
                        </div>

                        <form className="modal-form-compact">
                            <div className="form-row">
                                <input type="text" placeholder="First Name" required />
                                <input type="text" placeholder="Last Name" required />
                            </div>
                            <div className="form-row">
                                <input type="email" placeholder="Email Address" required />
                                <input type="tel" placeholder="Contact Number" required />
                            </div>
                            <div className="form-row">
                                <input type="date" title="DOB" />
                                <input type="text" placeholder="Years of Experience" />
                            </div>
                            <div className="file-area">
                                <label>Upload Resume (PDF/DOC)</label>
                                <input type="file" className="file-input" />
                            </div>
                            <div className="btn-row">
                                <button type="submit" className="btn-submit">Submit Application</button>
                                <button type="reset" className="btn-reset">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}