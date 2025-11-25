import React from "react";
import Breadcrumb from "./Breadcrumb";

/* -----------------------------
   EVENT DATA
------------------------------ */
const eventsData = [
  {
    id: 1,
    title: "RUDRAAKSH AANGAN",
    date: "August 15, 2024",
    category: "Milestone",
    description: "Located at Sanwer, Ujjain Road",
    image: "./images/img/1.jpg",
  },
  {
    id: 2,
    title: "RUDRAAKSH PRIME",
    date: "July 20, 2024",
    category: "Corporate",
    description: "Located at Indore-Ujjain 4 Lane to Palia Road",
    image: "./images/img/2.jpg",
  },
  {
    id: 3,
    title: "DRUDRAAKSH PRIDE",
    date: "June 5, 2024",
    category: "Site Visit",
    description: "Located at Indore-Ujjain 4 Lane to Palia Road",
    image: "./images/img/3.jpg",
  },
  {
    id: 4,
    title: "RUDRAAKSH HOMES",
    date: "May 10-12, 2024",
    category: "Internal",
    description: "Located at Indore-Ujjain 4 Lane to Palia Road",
    image: "./images/img/4.jpg",
  },
  {
    id: 5,
    title: "RUDRAAKSH PRIDE EX.",
    date: "April 22, 2024",
    category: "CSR",
    description: "Located at Indore-Ujjain 4 Lane to Palia Road",
    image: "./images/img/5.jpg",
  },
  {
    id: 6,
    title: "RUDRAAKSH HOME EX.",
    date: "March 1, 2024",
    category: "Product Launch",
    description: "Located at Indore-Ujjain 4 Lane to Palia Road",
    image: "./images/img/6.jpg",
  },
];

/* -----------------------------
   CUSTOM STYLE
------------------------------ */
const CustomStyles = () => (
  <style>
    {`
      :root {
        --primary: #0f5fc0;
        --dark: #1a1a1a;
        --radius: 22px;
      }

      .event-card {
        width: 100%;
        height: 380px;
        border-radius: var(--radius);
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: column;
        box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        transition: 0.3s ease;
        position: relative;
      }

      .event-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 18px 55px rgba(0,0,0,0.18);
      }

      .image-wrapper {
        height: 390px;
        position: relative;
        overflow: hidden;
      }

      .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.4s ease;
        transform: scale(1.08);
      }

      .event-card:hover .image-wrapper img {
        transform: scale(1.18);
      }

      .category-tag {
        position: absolute;
        top: 14px;
        right: 14px;
        padding: 6px 14px;
        font-size: 0.75rem;
        background: rgba(255,255,255,0.55);
        backdrop-filter: blur(8px);
        border-radius: 30px;
        color: #000;
        font-weight: 600;
      }

      .overlay-info {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 20px 18px;
        background: linear-gradient(180deg, transparent, rgba(0,0,0,0.85));
        color: white;
      }

      .overlay-title {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
        color: white;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .date-box {
        display: inline-block;
        background: rgba(255,255,255,0.9);
        color: var(--primary);
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        margin-bottom: 6px;
        font-weight: 600;
      }

      .card-body {
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 170px;
      }

      .desc {
        font-size: 0.87rem;
        color: #555;
        line-height: 1.5;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .btn-view {
        background: var(--primary);
        color: white;
        border: none;
        padding: 12px 0;
        border-radius: 12px;
        font-weight: 600;
        transition: 0.3s ease;
      }

      .btn-view:hover {
        background: #08408a;
        transform: translateY(-3px);
      }
        .premium-btn {
  background: linear-gradient(135deg, #0f5fc0, #0a3e84);
  color: #fff;
  border: none;
  padding: 12px 0;
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  box-shadow: 0 8px 20px rgba(15, 95, 192, 0.35);
  transition: 0.35s ease;
}

.premium-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(15, 95, 192, 0.45);
}

.premium-btn .arrow {
  transition: 0.35s ease;
  font-size: 1rem;
}

.premium-btn:hover .arrow {
  transform: translateX(6px);
}


      @media (max-width: 768px) {
        .event-card { height: 360px; }
        .image-wrapper { height: 390px; }
      }
    `}
  </style>
);

/* -----------------------------
   CARD COMPONENT
------------------------------ */
const EventCard = ({ event }) => (
  <div className="event-card">
    <div className="image-wrapper">
      <img src={event.image} alt={event.title} />
      {/* <div className="category-tag">{event.category}</div> */}

      <div className="overlay-info">
        {/* <div className="date-box">{event.date}</div> */}
        <h4 className="overlay-title">{event.title}</h4>
      </div>
    </div>

    <div className="card-body">
      <p className="desc">{event.description}</p>

      <button className="btn-view premium-btn">
        View Event Details
        <span className="arrow">→</span>
      </button>

    </div>
  </div>
);

/* -----------------------------
   MAIN GALLERY
------------------------------ */
const Gallery = () => {
  return (
    <>
    <Breadcrumb />
      <CustomStyles />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold fs-1">Our Event Gallery</h2>
          <p className="text-muted fs-5">Relive the defining moments of our journey</p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {eventsData.map((event) => (
            <div className="col" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
