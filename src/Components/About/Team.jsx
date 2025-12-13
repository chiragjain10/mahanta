import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'team');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rec = snap.docs.map((d) => ({ firebaseDocId: d.id, ...d.data() }));
        
        // Sort by custom 'id' field in ascending order (numeric then string)
        const sorted = rec.sort((a, b) => {
          const idA = a.id?.toString() || '';
          const idB = b.id?.toString() || '';
          
          const numA = parseFloat(idA);
          const numB = parseFloat(idB);
          
          // If both are valid numbers, compare numerically
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }
          
          // Otherwise, compare as strings
          return idA.localeCompare(idB);
        });
        
        setMembers(sorted);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return (
    <>
      <style>{`
        .premium-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #0A2540 0%, #061B2E 100%);
          overflow: hidden;
          margin-top: 33px;
        }

        .premium-hero::before {
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

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 6rem 0;
          text-align: center;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: white;
          margin-bottom: 1.5rem;
          font-family: 'Georgia', serif;
        }

        .hero-title strong {
          font-weight: 600;
          color: #1174d6;
        }

        .director-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }
      `}</style>
      <section className="premium-hero">
        <div className="director-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Our <strong>Team</strong>
            </h1>
            <p className="text-white text-lg opacity-80">
              Guiding Mahanta Group with wisdom, integrity, and forward-thinking vision
            </p>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "#f8faff" }}>
        <div className="container">


          {/* Title Section */}
          <div className="box-title text-center wow fadeInUp mb-5">
            <div className="text-subtitle text-primary">Our Teams</div>
            <h3 className="mt-4 title">Meet Our Agents</h3>
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="pb-5"
          >
            {loading ? (
              <div className="text-center py-5">Loading team...</div>
            ) : members.length === 0 ? (
              <div className="text-center py-5">No team members yet.</div>
            ) : members.map((m) => (
              <SwiperSlide key={m.firebaseDocId}>
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden team-card">

                  {/* IMAGE */}
                  <div className="position-relative overflow-hidden team-img-box">
                    <img
                      src={m.image || 'images/agents/agent-1.jpg'}
                      alt={m.name}
                      className="w-100"
                      style={{ height: "260px", objectFit: "cover", transition: "0.4s" }}
                    />

                    {/* Social Icons */}
                    <ul className="list-unstyled d-flex gap-2 position-absolute bottom-0 start-50 translate-middle-x mb-3 opacity-0 team-social">
                      {["facebook", "x", "linkedin", "instagram"].map((icon, i) => (
                        <li
                          key={i}
                          className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
                          style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            transition: "0.3s",
                          }}
                        >
                          <span className={`icon icon-${icon}`}></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CONTENT */}
                  <div className="card-body text-center">
                    <h5 className="fw-bold mb-1">{m.name}</h5>
                    <p className="text-muted mb-3">{m.role}</p>

                    <div className="d-flex justify-content-center gap-4 text-primary">
                      <span className="icon icon-phone fs-5" style={{ cursor: "pointer" }}></span>
                      <span className="icon icon-mail fs-5" style={{ cursor: "pointer" }}></span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
    </>
  );
};

export default Team;
