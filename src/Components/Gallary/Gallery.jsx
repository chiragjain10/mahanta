import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { Link } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
// import SectionHeader from '../Common/SectionHeader';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

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
    <section className="mb-5  ">
      <div>
        <section className="flat-title-page" style={{ backgroundImage: 'url(images/page-title/page-title-5.jpg)' }}>
          <div className="container">
            <div className="breadcrumb-content">
              <ul className="breadcrumb">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li className="text-white">/ Pages</li>
                <li className="text-white">/ Gallery</li>
              </ul>
              <h1 className="text-center text-white title">Gallery</h1>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <div className="gallery-header">
          <div className="box-title text-center wow fadeInUp">
            <div className="text-subtitle text-primary">Gallery</div>
            <h3 className="mt-4 title">Project Gallery</h3>
          </div>
          {/* <SectionHeader
            eyebrow="Gallery"
            title="Project Gallery"
            description="Handpicked updates and highlights from Mahanta projects."
          /> */}
        </div>

        {loading ? (
          <div className="blogs-state">
            <p>Loading gallery...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="blogs-state">
            <p>No images yet. Add some from the Admin panel.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {items.map((it, idx) => (
              <article
                key={it.id}
                className="gallery-card premium-card"
                data-aos="fade-up"
                data-aos-delay={100 + idx * 50}
                onClick={() => setActive(it)}
              >
                <div className="gallery-card-image">
                  <img src={it.image} alt="Gallery" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="modal-premium" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActive(null)}
            >
              ✕
            </button>

            <div className="modal-content">
              <img src={active.image} alt="Preview" className="modal-image" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
