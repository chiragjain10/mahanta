import React, { useEffect } from "react";

function Overview() {
  useEffect(() => {
    // Parallax tilt effect for right card + why cards
    const tiltItems = document.querySelectorAll(".tilt-card");

    tiltItems.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `
          rotateX(${-(y / 12)}deg)
          rotateY(${x / 12}deg)
          scale(1.03)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });

    // Scroll reveal animation
    const revealItems = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      revealItems.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add("visible");
      });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --primary: #1174d6;
          --primary-dark: #0d5fb1;
          --primary-hover: #0a4f94;
          --primary-light: #e8f2ff;
          --text-dark: #0f172a;
          --text-light: #475569;
        }

        /* Reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: 0.9s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------------- HERO SECTION ---------------- */
        .about-hero {
          padding: 4.5rem 0 5rem;
          background: linear-gradient(145deg, #ffffff 0%, #f6f9ff 100%);
        }

        .about-hero__grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .title {
          color: var(--text-dark);
          font-weight: 800;
          font-size: 2rem;
        }

        .about-hero__content p {
          color: var(--text-light);
          margin-top: 1rem;
          line-height: 1.7;
          font-size: 1.07rem;
        }

        /* CTA Buttons */
        .about-hero__cta {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
        }

        .about-btn {
          padding: 0.9rem 1.7rem;
          border-radius: 10px;
          font-weight: 700;
          transition: 0.25s ease;
          text-decoration: none;
          font-size: 0.98rem;
        }

        .about-btn.primary {
          background: var(--primary);
          color: #fff;
          box-shadow: 0 6px 20px rgba(17, 116, 214, 0.3);
        }

        .about-btn.primary:hover {
          background: var(--primary-hover);
          transform: translateY(-3px);
        }

        .about-btn.ghost {
          border: 2px solid var(--primary);
          color: var(--primary);
        }

        .about-btn.ghost:hover {
          background: var(--primary-light);
          transform: translateY(-3px);
        }

        /* ---------------- RIGHT CARD ---------------- */
        .about-hero__card {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px);
          padding: 2.2rem;
          border-radius: 20px;
          border: 1px solid rgba(17, 116, 214, 0.18);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          transition: 0.4s ease-in-out;
        }

        .card-label {
          background: var(--primary);
          color: var(--primary-dark);
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-block;
        }

        .about-hero__card h3 {
          color: var(--text-dark);
          margin-top: 1rem;
          line-height: 1.45;
          font-weight: 700;
          font-size: 1.35rem;
        }

        .about-hero__card ul {
          margin-top: 1.1rem;
          padding-left: 1.2rem;
          color: var(--text-light);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* Stats */
        .about-hero__stats {
          margin-top: 2rem;
          display: flex;
          gap: 2.2rem;
        }

        .about-hero__stats div span {
          color: var(--primary);
          font-size: 1.9rem;
          font-weight: 800;
        }

        .about-hero__stats div p {
          margin-top: 0.3rem;
          color: var(--text-light);
        }


        /* ---------------- WHY CHOOSE SECTION ---------------- */
        .about-why {
          margin-top: 5rem;
        }

        .about-why__grid {
          margin-top: 2.8rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .about-why__grid article {
          padding: 1.8rem;
          border: 1px solid rgba(17, 116, 214, 0.18);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.07);
          transition: 0.3s ease;
        }

        .about-why__grid article:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .about-why__grid article h3 {
          color: var(--primary-dark);
          font-weight: 700;
          font-size: 1.22rem;
          margin-bottom: 0.6rem;
        }

        .about-why__grid article p {
          color: var(--text-light);
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .about-hero__grid {
            grid-template-columns: 1fr;
          }

          .about-hero__card {
            margin-top: 2rem;
          }

          .about-why__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .about-why__grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      {/* PAGE CONTENT */}
      <section className="about-hero">
        <div className="about-hero__grid container">

          {/* LEFT CONTENT */}
          <div className="about-hero__content reveal">
            <div className="box-title">
              <div className="text-subtitle text-primary">Welcome To Mahanta Group</div>
              <h3 className="mt-4 title">
                Built on the trusted legacy of SOS Infrabulls.
              </h3>
            </div>

            <p>
              Mahanta Group, built and nurtured by SOS Infrabulls International Pvt. Ltd.,
              was established on 02 June 2019. With a strong foundation in Residential,
              Commercial and Industrial land, the Group provides secure investment and
              resale opportunities in India's cleanest city and Madhya Pradesh's economic
              capital - Indore. Carrying forward the trusted legacy of SOS Infrabulls,
              Mahanta Group now works with an even stronger commitment towards trust,
              transparency and growth.
            </p>

            <div className="about-hero__cta">
              <a href="/contact" className="tf-btn btn-view primary">Talk to our team</a>
              <a href="/services" className="about-btn ghost">Explore portfolio</a>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="about-hero__card tilt-card reveal">
            <p className="card-label text-white">Indore First</p>
            <h3>Exclusive projects across the city's fastest growing corridors.</h3>

            <ul>
              <li>Backed by Giants: Nurtured by SOS Infrabulls International Pvt. Ltd.</li>
              <li>Strategic Hub: Exclusive properties in Indore, MP’s economic capital.</li>
              <li>Complete Portfolio: Expert solutions for Residential, Commercial, and Industrial land.</li>
              <li>Secure Future: Dedicated to providing safe investments and high-value resale opportunities.</li>
            </ul>
          </div>

        </div>

        {/* WHY CHOOSE */}
        {/* <section className="about-why container reveal">
          <div className="box-title text-center">
            <div className="text-subtitle text-primary">Why Choose Mahanta Group</div>
            <h3 className="mt-4 title">Secure investments, guided by experts.</h3>
          </div>

          <div className="about-why__grid">
            <article className="tilt-card reveal">
              <h3>Backed by Giants</h3>
              <p>Nurtured by SOS Infrabulls International Pvt. Ltd.</p>
            </article>

            <article className="tilt-card reveal">
              <h3>Strategic Hub</h3>
              <p>Exclusive properties in Indore, MP’s economic capital.</p>
            </article>

            <article className="tilt-card reveal">
              <h3>Complete Portfolio</h3>
              <p>Expert solutions for Residential, Commercial, and Industrial land.</p>
            </article>

            <article className="tilt-card reveal">
              <h3>Secure Future</h3>
              <p>Dedicated to providing safe investments and high-value resale opportunities.</p>
            </article>
          </div>
        </section> */}

        {/* OUR MISSION */}
        


      </section>
    </>
  );
}

export default Overview;