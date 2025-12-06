import React, { useEffect } from "react";
import { FaBullseye, FaEye } from "react-icons/fa";
import "./About.css";

const MissionVision = () => {
  useEffect(() => {
    // 3D tilt effect
    const cards = document.querySelectorAll(".mv-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `
          rotateX(${-(y / 15)}deg)
          rotateY(${x / 20}deg)
          scale(1.04)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });

    // Scroll reveal effect
    const revealElements = document.querySelectorAll(".reveal");

    const handleReveal = () => {
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 60) {
          el.classList.add("reveal-visible");
        }
      });
    };

    handleReveal();
    window.addEventListener("scroll", handleReveal);

    return () => {
      window.removeEventListener("scroll", handleReveal);
    };
  }, []);

  return (
    <section className="mission-section container reveal">
      <div className="box-title text-center">
        <div className="text-subtitle text-primary">Mission & Vision</div>
        <h3 className="mt-4 title">
          Clarity, consistency, and customer-first intelligence.
        </h3>
      </div>

      <div className="mission-grid">
        <article className="mv-card reveal">
          <div className="mv-icon">
            <FaBullseye />
          </div>
          <h3>Our Mission</h3>
          <p>
            Our mission is to redefine the real estate experience in Indore. We
            leverage our deep local market expertise and client-centric
            solutions to ensure your property journey is transparent, reliable,
            and easy. We partner with you every step of the way to turn your
            property dreams into a lasting reality.
          </p>
        </article>

        <article className="mv-card reveal">
          <div className="mv-icon">
            <FaEye />
          </div>
          <h3>Our Vision</h3>
          <p>
            Our vision is clear: to become the most trusted and preferred real
            estate name in Indore. We aim to create a platform where every
            family and business can effortlessly find the property options that
            best match their goals and aspirations.
          </p>
        </article>
      </div>
    </section>
  );
};

export default MissionVision;
