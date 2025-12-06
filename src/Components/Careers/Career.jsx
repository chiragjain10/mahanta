import React from "react";
import { Link } from "react-router-dom";
import "./Career.css";

export default function Career() {
    const openings = [
        {
            title: "Sales Consultant / Real Estate Advisor",
            icon: "https://cdn.lordicon.com/hjeefwhm.json"
        },
        {
            title: "Digital Marketing Executive",
            icon: "https://cdn.lordicon.com/ssdupzsv.json"
        },
        {
            title: "Client Relationship Manager (CRM)",
            icon: "https://cdn.lordicon.com/dqxvvqzi.json"
        },
        {
            title: "Telesales Specialist / Lead Generator",
            icon: "https://cdn.lordicon.com/xfzuyvam.json"
        },
    ];

    const reasons = [
        {
            title: "High Commission & Incentives",
            desc: "Performance-driven payouts and instant rewards for top achievers.",
            icon: "https://cdn.lordicon.com/gqdnbnwt.json",
        },
        {
            title: "Access to Premium Inventory",
            desc: "Work with leading real estate projects across Indore.",
            icon: "https://cdn.lordicon.com/uvqdbrwr.json",
        },
        {
            title: "Accelerated Career Growth",
            desc: "Structured training & in-house promotions ensure fast growth.",
            icon: "https://cdn.lordicon.com/pxecqsgb.json",
        },
        {
            title: "Innovative Marketing Campaigns",
            desc: "We use cutting-edge digital strategies to generate quality leads.",
            icon: "https://cdn.lordicon.com/jxjfjyby.json",
        },
        {
            title: "Collaborative Culture",
            desc: "Work with a goal-driven, energetic, and supportive team.",
            icon: "https://cdn.lordicon.com/eszyyflr.json",
        },
    ];

    return (
        <>

            {/* HERO SECTION */}
            <div>
                <section
                    className="flat-title-page"
                    style={{ backgroundImage: 'url(images/home/house-1.jpg)' }}
                >
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul className="breadcrumb">
                                <li><Link to="/" className="text-white">Home</Link></li>
                                <li className="text-white">/ Pages</li>
                                <li className="text-white">/ Career</li>
                            </ul>
                            <h1 className="text-center text-white title">Career</h1>
                        </div>
                    </div>
                </section>
            </div>


            {/* CURRENT OPENINGS */}
            <section className="career-section container">
                <div className="box-title text-center wow fadeInUp">
                    <div className="text-subtitle text-primary">Current Openings</div>
                    <h3 className="mt-4 title"> We are seeking passionate individuals for our estate industry.</h3>
                </div>
                {/* <h2 className="section-heading">Current Openings</h2>
                <p className="section-desc">
                    We are seeking passionate individuals ready to grow in the real estate industry.
                </p> */}

                <div className="openings-grid">
                    {openings.map((job, i) => (
                        <div key={i} className="job-card">
                            <div className="job-icon">
                                <lord-icon
                                    src={job.icon}
                                    trigger="hover"
                                    style={{ width: "55px", height: "55px" }}
                                ></lord-icon>
                            </div>

                            <h3 className="job-title">{job.title}</h3>

                            <a
                                href="https://forms.gle/your-google-form-link"
                                target="_blank"
                                rel="noreferrer"
                                className="apply-btn"
                            >
                                Apply Now
                            </a>
                        </div>
                    ))}
                </div>
            </section>


            {/* WHY JOIN US */}
            <section className="why-join-section">
                <div className="container">
                    <div className="box-title text-center wow fadeInUp">
                        <div className="text-subtitle text-primary">Why Join Us?</div>
                        <h3 className="mt-4 title"> Key reasons to build your career with Mahanta Group</h3>
                    </div>
                    {/* <h2 className="section-heading text-center">Why Join Us?</h2>
                    <p className="section-desc text-center">
                       
                    </p> */}

                    <div className="reasons-grid">
                        {reasons.map((r, i) => (
                            <div key={i} className="reason-card">
                                <lord-icon
                                    src={r.icon}
                                    trigger="hover"
                                    style={{ width: "55px", height: "55px" }}
                                ></lord-icon>

                                <h4>{r.title}</h4>
                                <p>{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
