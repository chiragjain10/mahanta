import React, { useEffect, useState } from "react";
import "./Counter.css";

function Counter() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        /* ===============================
           REVEAL ON SCROLL
        =============================== */
        const reveal = () => {
            const section = document.querySelector(".compact-counter-section");
            if (!section) return;

            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 120) {
                section.classList.add("reveal-visible");
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", reveal);
        reveal();

        /* ===============================
           COUNTER ANIMATION
        =============================== */
        const counters = document.querySelectorAll(".counter-number");
        let started = false;

        const animateCounters = () => {
            const section = document.querySelector(".compact-counter-section");
            if (!section || started) return;

            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 120) {
                started = true;

                counters.forEach((counter, i) => {
                    const target = +counter.dataset.target;
                    let count = 0;
                    const speed = target / 80;

                    const update = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = Math.floor(count);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target.toLocaleString() + "+";
                            counter.parentElement.classList.add("celebrate");
                        }
                    };

                    setTimeout(update, i * 120);
                });
            }
        };

        window.addEventListener("scroll", animateCounters);
        animateCounters();

        /* ===============================
           SAFE 3D TILT
        =============================== */
        const cards = document.querySelectorAll(".compact-card");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateY = ((x / rect.width) - 0.5) * 10;
                const rotateX = ((y / rect.height) - 0.5) * -10;

                card.style.transform = `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                `;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0)";
            });
        });

        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("scroll", animateCounters);
        };
    }, []);

    const data = [
        { icon: "users", value: 1700, label: "Satisfied Clients" },
        { icon: "user-tie", value: 200, label: "Team Members" },
        { icon: "calendar-alt", value: 6, label: "Years Experience" },
        { icon: "tasks", value: 15, label: "Total Projects" }
    ];

    return (
        <section className="compact-counter-section reveal">
            <div className="container">
                <h3 className="mt-4 title text-center mb-5">  Delivering excellence through measurable results</h3>
                <div className="compact-grid">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className={`compact-card ${isVisible ? "card-visible" : ""}`}
                        >
                            <div className="card-icon">
                                <div className="icon-container">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </div>
                                <span className="icon-glow"></span>
                            </div>

                            <div className="card-content">
                                <h3 className="counter-number" data-target={item.value}>
                                    0
                                </h3>
                                <p className="card-label text-center mt-2">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Counter;
