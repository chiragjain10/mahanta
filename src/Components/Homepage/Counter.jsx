import React, { useEffect, useState } from "react";
import "./Counter.css";

function Counter() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        /* =====================================
              1) SCROLL REVEAL ANIMATION
        ===================================== */
        const revealElements = document.querySelectorAll(".reveal");

        const handleReveal = () => {
            revealElements.forEach((el) => {
                const top = el.getBoundingClientRect().top;
                if (top < window.innerHeight - 80) {
                    el.classList.add("reveal-visible");
                    setIsVisible(true);
                }
            });
        };

        handleReveal();
        window.addEventListener("scroll", handleReveal);

        /* =====================================
               2) COUNTER ANIMATION
        ===================================== */
        const counters = document.querySelectorAll(".counter-number");
        let started = false;

        const animateCounters = () => {
            const section = document.querySelector(".compact-counter-section");
            if (!section) return;

            const top = section.getBoundingClientRect().top;

            if (!started && top < window.innerHeight - 120) {
                started = true;

                counters.forEach((counter, index) => {
                    const target = +counter.getAttribute("data-target");
                    let count = 0;
                    const speed = target / 150;
                    const duration = 1500;
                    const increment = target / (duration / 16);

                    const update = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.floor(count);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target.toLocaleString() + "+";
                            counter.parentElement.classList.add("celebrate");
                        }
                    };

                    setTimeout(() => {
                        update();
                    }, index * 100); // Staggered animation
                });
            }
        };

        window.addEventListener("scroll", animateCounters);
        animateCounters();

        /* 3D TILT EFFECT */
        const cards = document.querySelectorAll(".compact-card");
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });

        /* CLEANUP EVENTS */
        return () => {
            window.removeEventListener("scroll", handleReveal);
            window.removeEventListener("scroll", animateCounters);
        };
    }, []);

    return (
        <section className="compact-counter-section reveal">
            <div className="container">
                {/* <div className="section-header">
                    <h2 className="section-title">
                        <span className="accent-text">Success</span> in Numbers
                    </h2>
                    <p className="section-subtitle">Delivering excellence through measurable results</p>
                </div> */}
                <div className="box-title text-center wow fadeInUp">
                    <h3 className="mt-4 title">Delivering excellence through measurable results</h3>
                </div>

                <div className="compact-grid">
                    {/* Card 1 */}
                    <div className={`compact-card ${isVisible ? 'card-visible' : ''}`}>
                        <div className="card-icon">
                            <div className="icon-container">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="icon-glow"></div>
                        </div>
                        <div className="card-content">
                            <h3 className="counter-number" data-target="1700">0</h3>
                            <p className="card-label text-center mt-1 fw-bold">Satisfied Clients</p>
                        </div>
                        <div className="card-hover-bg"></div>
                        <div className="card-border"></div>
                    </div>

                    {/* Card 2 */}
                    <div className={`compact-card ${isVisible ? 'card-visible' : ''}`}>
                        <div className="card-icon">
                            <div className="icon-container">
                                <i className="fas fa-user-tie"></i>
                            </div>
                            <div className="icon-glow"></div>
                        </div>
                        <div className="card-content">
                            <h3 className="counter-number" data-target="200">0</h3>
                            <p className="card-label text-center mt-1 fw-bold">Team Members</p>
                        </div>
                        <div className="card-hover-bg"></div>
                        <div className="card-border"></div>
                    </div>

                    {/* Card 3 */}
                    <div className={`compact-card ${isVisible ? 'card-visible' : ''}`}>
                        <div className="card-icon">
                            <div className="icon-container">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div className="icon-glow"></div>
                        </div>
                        <div className="card-content">
                            <h3 className="counter-number" data-target="6">0</h3>
                            <p className="card-label text-center mt-1 fw-bold">Years Experience</p>
                        </div>
                        <div className="card-hover-bg"></div>
                        <div className="card-border"></div>
                    </div>

                    {/* Card 4 */}
                    <div className={`compact-card ${isVisible ? 'card-visible' : ''}`}>
                        <div className="card-icon">
                            <div className="icon-container">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className="icon-glow"></div>
                        </div>
                        <div className="card-content">
                            <h3 className="counter-number" data-target="15">0</h3>
                            <p className="card-label text-center mt-1 fw-bold">Total Projects</p>
                        </div>
                        <div className="card-hover-bg"></div>
                        <div className="card-border"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Counter;