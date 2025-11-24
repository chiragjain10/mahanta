import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const agents = [
  {
    id: 1,
    name: "Chris Patt",
    role: "Administrative Staff",
    img: "images/agents/agent-1.jpg",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Administrative Staff",
    img: "images/agents/agent-2.jpg",
  },
  {
    id: 3,
    name: "Darrell Steward",
    role: "Administrative Staff",
    img: "images/agents/agent-3.jpg",
  },
  {
    id: 4,
    name: "Robert Fox",
    role: "Administrative Staff",
    img: "images/agents/agent-4.jpg",
  },
];

const Team = () => {
  return (
    <section className="py-5" style={{ background: "#f8faff" }}>
      <div className="container">

        {/* Title Section */}
        <div className="text-center mb-5">
          <p className="text-primary fw-semibold mb-1" style={{ fontSize: "18px" }}>
            Our Teams
          </p>
          <h2 className="fw-bold">Meet Our Agents</h2>
          <p className="text-muted mt-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Our experienced and dedicated team is committed to helping you find the perfect property.
          </p>
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
          {agents.map((agent) => (
            <SwiperSlide key={agent.id}>
              <div className="card shadow-sm border-0 rounded-3 overflow-hidden team-card">

                {/* IMAGE */}
                <div className="position-relative overflow-hidden team-img-box">
                  <img
                    src={agent.img}
                    alt={agent.name}
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
                  <h5 className="fw-bold mb-1">{agent.name}</h5>
                  <p className="text-muted mb-3">{agent.role}</p>

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
  );
};

export default Team;
