import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <section className="terms">
      <div className="container">
        <header className="terms__header" data-aos="fade-up">
          <h1>Terms and Conditions</h1>
          <p className="terms__meta">Last updated: November 25, 2025</p>
        </header>

        <div className="terms__content">
          <article className="terms__card" data-aos="fade-up" data-aos-delay="50">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these Terms and
              Conditions and our Privacy Policy. If you do not agree, please discontinue use of
              the website.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="100">
            <h2>2. Services</h2>
            <p>
              Mahanta Group provides information related to real estate projects, services, and
              related content. All information is provided for general guidance and is subject to
              change without notice.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="150">
            <h2>3. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, graphics, and media on this website are the
              property of their respective owners and protected by applicable intellectual
              property laws. Unauthorized use is prohibited.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="200">
            <h2>4. Third‑Party Links</h2>
            <p>
              This website may contain links to third‑party websites. We are not responsible for
              the content, accuracy, or practices of third‑party sites and recommend you review
              their terms and policies.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="250">
            <h2>5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Mahanta Group shall not be liable for any
              direct, indirect, incidental, consequential, or special damages arising out of or in
              connection with the use of this website or services.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="300">
            <h2>6. User Responsibilities</h2>
            <p>
              You agree to use this website lawfully and not to engage in any activity that may
              harm, disrupt, or compromise the security or integrity of the site or its services.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="350">
            <h2>7. Changes to Terms</h2>
            <p>
              We may update these Terms and Conditions from time to time. Continued use of the
              website after changes constitutes acceptance of the updated terms.
            </p>
          </article>

          <article className="terms__card" data-aos="fade-up" data-aos-delay="400">
            <h2>8. Contact Us</h2>
            <p>
              For questions regarding these Terms and Conditions, please contact us at
              <a className="terms__link" href="mailto:info@mahantagroup.com"> info@mahantagroup.com</a>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Terms;
