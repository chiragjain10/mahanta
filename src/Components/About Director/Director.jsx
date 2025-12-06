import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Director() {

  /* ----------------------------------------
     EFFECTS: 3D Scroll Reveal + Hover Tilt
  ---------------------------------------- */
  useEffect(() => {
    // Tilt Effect
    const tiltElements = document.querySelectorAll(".tilt-card");

    tiltElements.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 10;
        const y = (e.clientY - rect.top - rect.height / 2) / 10;

        el.style.transform = `rotateX(${-(y)}deg) rotateY(${x}deg) scale(1.03)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });

    // Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal");

    const handleReveal = () => {
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
          el.classList.add("reveal-visible");
        }
      });
    };

    handleReveal();
    window.addEventListener("scroll", handleReveal);

    return () => window.removeEventListener("scroll", handleReveal);
  }, []);


  return (
    <>
      <style>{`
        :root {
          --primary: #1174d6;
          --primary-dark: #0d5fb1;
          --primary-light: #e7f2ff;
          --text-dark: #0f172a;
          --text-light: #475569;
        }

        /* ==========================
           3D SCROLL REVEAL
        ========================== */
        .reveal {
          opacity: 0;
          transform: perspective(900px) rotateX(35deg) translateY(50px) scale(0.95);
          transition: 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top;
        }
        .reveal-visible {
          opacity: 1;
          transform: perspective(900px) rotateX(0) translateY(0) scale(1);
        }

        /* ==========================
           PAGE BASE
        ========================== */
        .director-hero {
          padding: 4rem 0 5rem;
        }

        .director-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        /* ==========================
           DIRECTOR PHOTO (3D Card)
        ========================== */
        .director-photo {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(10px);
          box-shadow: 0 22px 45px rgba(0,0,0,0.12);
          transform-style: preserve-3d;
          transition: 0.4s ease;
        }

        .director-photo img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        /* ==========================
           TEXT CONTENT
        ========================== */
        .director-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-dark);
        }

        .director-subtext {
          margin-top: 0.4rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--primary-dark);
        }

        .director-content p {
          margin-top: 1rem;
          color: var(--text-light);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* ==========================
           QUOTE BOX (Glass Effect)
        ========================== */
        .director-message-box {
          margin-top: 2rem;
          padding: 1.7rem;
          border-radius: 16px;
          background: rgba(17,116,214,0.08);
          border-left: 6px solid var(--primary);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
        }

        .director-message-box p {
          color: var(--text-dark);
          font-size: 1.05rem;
          font-weight: 500;
        }

        /* ==========================
           RESPONSIVE
        ========================== */
        @media(max-width: 900px) {
          .director-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>


      {/* ==========================
             PAGE CONTENT
      ========================== */}
      <section className="director-hero container">

        {/* Breadcrumb Section */}
        <section
          className="flat-title-page reveal"
          style={{ backgroundImage: "url(images/page-title/page-title-5.jpg)" }}
        >
          <div className="container">
            <div className="breadcrumb-content">
              <ul className="breadcrumb">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li className="text-white">/ Pages</li>
                <li className="text-white">/ About Director</li>
              </ul>
              <h1 className="text-center text-white title">About Director</h1>
            </div>
          </div>
        </section>


        {/* ==========================
            SECTION 1 — PAWAN TILVE
        ========================== */}
        <div className="director-grid">

          {/* LEFT PHOTO */}
          <div className="director-photo tilt-card reveal">
            <img src="images/img/01 (1).png" alt="MD Pawan Tilve" />
          </div>

          {/* RIGHT CONTENT */}
          <div className="director-content reveal">
            <h2 className="director-title">Mr. Pawan Tilve</h2>
            <div className="director-subtext">Managing Director, Mahanta Group</div>

            <p>
              एक नए कल की शुरुआत,
              हमारी प्राथमिकता मध्यवर्गीय परिवार की मेहनत से एकत्र की गई जमापूँजी को एक सही जगह निवेश कराना है, ताकि वह अपने सपनों का आशियाना वहाँ बना पाएं एवं हमसे जुड़ी हमारी सेल्स टीम को पूर्णरूप से ईमानदारी के साथ प्रशिक्षित कर बेहतर भविष्य की ओर ले जाना ही हमारा लक्ष्य है।

            </p>

          </div>

        </div>

        {/* ==========================
            SECTION 2 — VIKAS GARG
        ========================== */}
        <div className="director-grid">

          {/* LEFT CONTENT */}
          <div className="director-content reveal">
            <h2 className="director-title">Mr. Vikas Garg</h2>
            <div className="director-subtext">CMD, Mahanta Group</div>

            <p>

              सर्वप्रथम हम आपको धन्यवाद देते हैं कि आपने हमसे संपर्क (वेबसाइट पर) किया और हमारे बारे में जानने के लिए उत्सुक हैं।

            </p>

            <p>
              हम कौन हैं? हम भी बिल्कुल आप ही की तरह हैं; जो ऐसा चाहते हैं कि हमारा निवेश सुरक्षित हो जिससे संपत्ति खरीदते या बेचते समय परेशानी न हो और हमारा भविष्य सुरक्षित हो सके।

            </p>

            <p>
              हम क्या करते हैं? हम भी बिल्कुल आप ही की तरह निर्णय लेते हैं। पहले देखते हैं फिर सोचते हैं तब निर्णय लेते हैं कि क्या यह अवसर निवेश को गति देने के लिए सही है। 

            </p>

            <p>
             हम यह क्यों करते हैं? हम यह जानते हैं कि पूरे जीवन भर की छोटी बचत जिसे "निवेश" कहते हैं वह कैसे एकत्रित होती है। जिसे बहुत आसानी से डूबाया या निवेशित नहीं किया जा सकता। बिना आपकी जरूरतों को समझें हम आपको किसी भी निवेश की सलाह या मार्गदर्शन नहीं देते हैं, क्योंकि यह हमारी वचनबद्धता है। 


            </p>

            <div className="director-message-box">
              <p>“आप और मैं तभी तो कहलायेंगे "हम"'</p>
            </div>
          </div>

          {/* RIGHT PHOTO */}
          <div className="director-photo tilt-card reveal">
            <img src="images/img/01 (2).png" alt="CMD Vikas Garg" />
          </div>

        </div>

      </section>
    </>
  );
}

export default Director;
