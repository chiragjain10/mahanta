import React, { useState, useEffect, useRef } from "react";
import "./Counter.css";

const CounterCard = ({ item, delay }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = item.value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, item.value]);

  return (
    <div 
      className={`pc-card ${hasStarted ? "pc-visible" : ""}`} 
      ref={cardRef}
      style={{ "--pc-delay": `${delay}s` }}
    >
      <div className="pc-card-inner">
        <div className="pc-icon-box">
          <i className={`fas fa-${item.icon}`}></i>
          <div className="pc-icon-glow"></div>
        </div>
        <div className="pc-content">
          <h2 className="pc-number">
            {count.toLocaleString()}<span>+</span>
          </h2>
          <p className="pc-label">{item.label}</p>
        </div>
      </div>
      <div className="pc-shimmer"></div>
    </div>
  );
};

export default function Counter() {
  const data = [
    { icon: "users", value: 1700, label: "Satisfied Clients" },
    { icon: "user-tie", value: 200, label: "Team Members" },
    { icon: "calendar-alt", value: 6, label: "Years Experience" },
    { icon: "tasks", value: 15, label: "Total Projects" }
  ];

  return (
    <section className="pc-wrapper">
      <div className="pc-container">
        <div className="pc-header">
          <span className="pc-subtitle">Our Achievement</span>
          <h2 className="pc-main-title">
            Delivering excellence through <br />
            <span className="pc-gradient-text">measurable results</span>
          </h2>
        </div>

        <div className="pc-grid">
          {data.map((item, index) => (
            <CounterCard key={index} item={item} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}