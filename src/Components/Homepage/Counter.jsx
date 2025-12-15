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

                    setTimeout(update, index * 100);
                });
            }
        };

        window.addEventListener("scroll", animateCounters);
        animateCounters();

        /* =====================================
            3) 3D TILT EFFECT (SAFE)
        ===================================== */
        const cards = document.querySelectorAll(".compact-card");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform =
                    "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
            });
        });

        return () => {
            window.removeEventListener("scroll", handleReveal);
            window.removeEventListener("scroll", animateCounters);
        };
    }, []);

    return (
        <section className="compact-counter-section reveal">
            <div className="container">
                <div className="box-title text-center">
                    <h3 className="mt-4 title">
                        Delivering excellence through measurable results
                    </h3>
                </div>

                <div className="compact-grid">
                    {[
                        { icon: "users", value: 1700, label: "Satisfied Clients" },
                        { icon: "user-tie", value: 200, label: "Team Members" },
                        { icon: "calendar-alt", value: 6, label: "Years Experience" },
                        { icon: "tasks", value: 15, label: "Total Projects" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`compact-card ${isVisible ? "card-visible" : ""}`}
                        >
                            <div className="card-icon">
                                <div className="icon-container">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </div>
                                <div className="icon-glow"></div>
                            </div>

                            <div className="card-content">
                                <h3
                                    className="counter-number"
                                    data-target={item.value}
                                >
                                    0
                                </h3>
                                <p className="card-label text-center mt-1 fw-bold">
                                    {item.label}
                                </p>
                            </div>

                            <div className="card-hover-bg"></div>
                            <div className="card-border"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Counter;
