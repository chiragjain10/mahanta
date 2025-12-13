import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ref = collection(db, 'gallery');
    const q = query(ref, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const rec = snap.docs.map((d) => ({ firebaseDocId: d.id, ...d.data() }));
        // Sort by custom id field in ascending order
        rec.sort((a, b) => {
          // Try to parse as numbers first
          const numA = parseInt(a.id) || 0;
          const numB = parseInt(b.id) || 0;
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }
          // Fall back to string comparison
          return (a.id || '').localeCompare(b.id || '');
        });
        setItems(rec);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, []);

  return (
    <section className="mb-5">
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
      {/* Page Title Banner */}
      {/* <section className="premium-hero">
        <div className="director-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Event <strong>Gallery</strong>
            </h1>
            <p className="text-white text-lg opacity-80">
              Guiding Mahanta Group with wisdom, integrity, and forward-thinking vision
            </p>
          </div>
        </div>
      </section> */}

      {/* Main Container */}
      <div className="container gallery-page mt-5 pt-5">
        <div className="gallery-header">
          <div className="box-title text-center wow fadeInUp">
            {/* <div className="text-subtitle text-primary">Gallery</div> */}
            <h3 className="mt-4 title">Events</h3>
          </div>
        </div>

        {/* Loading / No Data / Image Grid */}
        {loading ? (
          <div className="blogs-state"><p>Loading gallery...</p></div>
        ) : items.length === 0 ? (
          <div className="blogs-state"><p>No images yet. Add some from the Admin panel.</p></div>
        ) : (
          <div className="row g-4 premium-gallery-row">
            {items.map((it, idx) => (
              <div
                key={it.firebaseDocId}
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <article
                  className="gallery-card-3d"
                onClick={() => { setActive(it); setActiveIndex(it.primaryImageIndex || 0); }}
                >
                  <div className="gallery-image-wrapper">
                    <img
                      src={(it.images && it.images[it.primaryImageIndex || 0]) || it.image}
                      alt="Event"
                      className="gallery-image"
                    />

                    <div className="gallery-overlay">
                      <span>View</span>
                    </div>
                  </div>

                  <div className="gallery-card-footer">
                    <h5 className="gallery-title">{it.title || "Event"}</h5>
                  </div>
                </article>
              </div>
            ))}
          </div>


        )}
      </div>

      {/* Modal Popup */}
      {active && (
        <div className="lux-modal-backdrop" onClick={() => setActive(null)}>

          <div className="lux-modal-container" onClick={(e) => e.stopPropagation()}>

            {/* Top Bar */}
            <div className="lux-modal-header">
              <h4 className="lux-title">{active.title || "Event"}</h4>
              <button className="lux-close-btn" onClick={() => setActive(null)}>✕</button>
            </div>

            {/* Main Image Section */}
            <div className="lux-image-wrapper">
              <button
                className="lux-nav-btn left"
                onClick={() =>
                  setActiveIndex((prev) =>
                    (prev - 1 + active.images.length) % active.images.length
                  )
                }
              >
                ‹
              </button>

              <img
                src={active.images ? active.images[activeIndex] : active.image}
                alt="Preview"
                className="lux-main-image"
              />

              <button
                className="lux-nav-btn right"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % active.images.length)
                }
              >
                ›
              </button>
            </div>

            {/* Thumbnails Strip */}
            {Array.isArray(active.images) && active.images.length > 1 && (
              <div className="lux-thumbs-row">
                {active.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="thumb"
                    onClick={() => setActiveIndex(i)}
                    className={`lux-thumb ${i === activeIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      )}


    </section>
  );
};

export default Gallery;
