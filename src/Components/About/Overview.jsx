import React from "react";

function Overview() {
  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        :root {
          --primary: #1174d6;
          --primary-dark: #0d5fb1;
          --primary-hover: #0a4f94;
          --primary-light: #e8f2ff;
          --text-dark: #0f172a;
          --text-light: #475569;
        }

        .about-hero {
          padding: 4rem 0;
          background: #ffffff;
        }

        .about-hero__grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        .text-primary {
          color: var(--primary);
        }

        .title {
          color: var(--text-dark);
          font-weight: 700;
          font-size: 1.9rem;
        }

        .about-hero__content p {
          color: var(--text-light);
          margin-top: 1rem;
          line-height: 1.6;
          font-size: 1.02rem;
        }

        /* CTA Buttons */
        .about-hero__cta {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
        }

        .about-btn {
          padding: 0.8rem 1.6rem;
          border-radius: 8px;
          font-weight: 600;
          transition: 0.25s ease;
          text-decoration: none;
        }

        .about-btn.primary {
          background: var(--primary);
          color: #fff;
        }

        .about-btn.primary:hover {
          background: var(--primary-hover);
        }

        .about-btn.ghost {
          border: 2px solid var(--primary);
          color: var(--primary);
          background: transparent;
        }

        .about-btn.ghost:hover {
          background: var(--primary-light);
        }

        /* RIGHT CARD */
        .about-hero__card {
          background: #fff;
          padding: 2rem;
          border-radius: 18px;
          border: 1px solid rgba(17, 116, 214, 0.2);
          box-shadow: 0 12px 28px rgba(0,0,0,0.06);
        }

        .card-label {
          background: var(--primary-light);
          color: var(--primary-dark);
          padding: 0.35rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
        }

        .about-hero__card h3 {
          color: var(--text-dark);
          margin-top: 1rem;
          line-height: 1.4;
        }

        .about-hero__card ul {
          margin-top: 1rem;
          padding-left: 1.2rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        /* Stats */
        .about-hero__stats {
          margin-top: 2rem;
          display: flex;
          gap: 2rem;
        }

        .about-hero__stats div span {
          color: var(--primary);
          font-size: 1.7rem;
          font-weight: 700;
        }

        .about-hero__stats div p {
          margin-top: 0.3rem;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        /* WHY CHOOSE SECTION */
        .about-why {
          margin-top: 4rem;
        }

        .about-why__grid {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .about-why__grid article {
          padding: 1.6rem;
          border: 1px solid rgba(17, 116, 214, 0.15);
          border-radius: 14px;
          background: #fff;
          transition: 0.25s ease;
        }

        .about-why__grid article:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .about-why__grid article h3 {
          color: var(--primary-dark);
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
        }

        .about-why__grid article p {
          color: var(--text-light);
          line-height: 1.55;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .about-hero__grid {
            grid-template-columns: 1fr;
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
          {/* Left */}
          <div className="about-hero__content">
            <div className="box-title text-center">
              <div className="text-subtitle text-primary">Welcome to Mahanta Group</div>
              <h3 className="mt-4 title">Built on the trusted legacy of SOS Infrabulls.</h3>
            </div>

            <p>
              Mahanta Group, built and nurtured by SOS Infrabulls International Pvt. Ltd., was established on
              02 June 2019. With a strong foundation in Residential, Commercial and Industrial land, the Group
              provides secure investment and resale opportunities in India’s cleanest city and Madhya Pradesh’s
              economic capital — Indore.
            </p>

            <p>
              Carrying forward the trusted legacy of SOS Infrabulls, Mahanta Group now works with an even stronger
              commitment towards trust, transparency and growth.
            </p>

            <div className="about-hero__cta">
              <a href="/contact" className="about-btn primary">Talk to our team</a>
              <a href="/services" className="about-btn ghost">Explore portfolio</a>
            </div>
          </div>

          {/* Right card */}
          <div className="about-hero__card">
            <p className="card-label">Indore First</p>
            <h3>Exclusive projects across the city's fastest growing corridors.</h3>

            <ul>
              <li>Strategic plots near economic hubs</li>
              <li>End-to-end advisory & resale support</li>
              <li>Legacy powered risk-mitigated investments</li>
            </ul>

            <div className="about-hero__stats">
              <div>
                <span>2019</span>
                <p>Established</p>
              </div>
              <div>
                <span>3+</span>
                <p>Asset classes</p>
              </div>
              <div>
                <span>100%</span>
                <p>Transparent deals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose */}
        <section className="about-why container">
          <div className="box-title text-center">
            <div className="text-subtitle text-primary">Why choose Mahanta Group</div>
            <h3 className="mt-4 title">Secure investments, guided by experts.</h3>
          </div>

          <div className="about-why__grid">
            <article>
              <h3>Backed by Giants</h3>
              <p>
                Nurtured by SOS Infrabulls International Pvt. Ltd., combining legacy credibility with agile execution.
              </p>
            </article>

            <article>
              <h3>Strategic Hub</h3>
              <p>
                Exclusive properties located across Indore, the economic capital of Madhya Pradesh.
              </p>
            </article>

            <article>
              <h3>Complete Portfolio</h3>
              <p>
                Expert solutions for Residential, Commercial, and Industrial land acquisitions.
              </p>
            </article>

            <article>
              <h3>Secure Future</h3>
              <p>
                Safe investments, high-value resale opportunities, and long-term partnerships.
              </p>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}

export default Overview;
