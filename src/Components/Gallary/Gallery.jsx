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
        const rec = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(rec);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, []);

  return (
    <section className="mb-5">
      {/* Page Title Banner */}
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
                <li className="text-white">/ Events</li>
              </ul>
              <h1 className="text-center text-white title">Events</h1>
            </div>
          </div>
        </section>
      </div>

      {/* Main Container */}
      <div className="container gallery-page">
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
                key={it.id}
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <article
                  className="gallery-card-3d"
                  onClick={() => { setActive(it); setActiveIndex(0); }}
                >
                  <div className="gallery-image-wrapper">
                    <img
                      src={(it.images && it.images[0]) || it.image}
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
