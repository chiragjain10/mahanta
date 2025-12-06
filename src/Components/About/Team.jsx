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
        const rec = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMembers(rec);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return (
    <div>
      <section className="flat-title-page" style={{ backgroundImage: 'url(images/home/house-1.jpg)' }}>
        <div className="container">
          <div className="breadcrumb-content">
            <ul className="breadcrumb">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li className="text-white">/ Pages</li>
              <li className="text-white">/ Team </li>
            </ul>
            <h1 className="text-center text-white title">Team</h1>
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
              <SwiperSlide key={m.id}>
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
    </div>
  );
};

export default Team;
