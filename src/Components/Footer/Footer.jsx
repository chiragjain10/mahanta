import React, { useState, useEffect } from 'react';
import './Footer.css';

const PremiumFooter = () => {
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log('Subscribed with email:', email);
        setEmail('');
        // Add your subscription logic here
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <footer className="premium-footer">
                {/* Top Section - Brand & Social */}
                <div className="premium-footer-top">
                    <div className="container">
                        <div className="premium-footer-brand">
                            <div className="premium-footer-logo">
                                <a href="/">
                                    <img 
                                        src="images/logo/logo@2x.png" 
                                        alt="Mahanta Group" 
                                        width="180" 
                                        height="52" 
                                    />
                                </a>
                                <p className="premium-footer-tagline">
                                    Premium Real Estate Solutions for Discerning Clients
                                </p>
                            </div>
                            <div className="premium-social-links">
                                <span className="premium-social-title">Connect With Us</span>
                                <div className="premium-social-icons">
                                    {[
                                        { name: 'Facebook', icon: 'F' },
                                        { name: 'LinkedIn', icon: 'IN' },
                                        { name: 'Twitter', icon: 'X' },
                                        { name: 'Instagram', icon: 'IG' },
                                        { name: 'YouTube', icon: 'YT' }
                                    ].map((social, index) => (
                                        <a 
                                            key={index}
                                            href="#" 
                                            className="premium-social-icon"
                                            aria-label={social.name}
                                        >
                                            <span>{social.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="premium-footer-main">
                    <div className="container">
                        <div className="premium-footer-grid">
                            {/* Contact Information */}
                            <div className="premium-footer-column">
                                <h4 className="premium-column-title">Get In Touch</h4>
                                <div className="premium-contact-info">
                                    <div className="premium-contact-item">
                                        <div className="premium-contact-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10 1C6.13 1 3 4.13 3 8C3 13.25 10 19 10 19C10 19 17 13.25 17 8C17 4.13 13.87 1 10 1ZM10 10.5C8.62 10.5 7.5 9.38 7.5 8C7.5 6.62 8.62 5.5 10 5.5C11.38 5.5 12.5 6.62 12.5 8C12.5 9.38 11.38 10.5 10 10.5Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className="premium-contact-details">
                                            <p>405 - Shagun tower, Above Apna Sweets, AB Road, Vijay Nagar, Indore, 452001</p>
                                        </div>
                                    </div>
                                    <div className="premium-contact-item">
                                        <div className="premium-contact-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C6.00258 11.8784 8.12159 13.9974 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.26801 18 1 11.732 1 4V3C1 2.44772 1.44772 2 2 2Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className="premium-contact-details">
                                            <a href="tel:+91-7314909915">+91 7314909915</a>
                                        </div>
                                    </div>
                                    <div className="premium-contact-item">
                                        <div className="premium-contact-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M2.003 5.884L10 9.882L17.997 5.884C17.967 5.374 17.744 4.895 17.372 4.545C17 4.195 16.505 4 16 4H4C3.495 4 3 4.195 2.628 4.545C2.256 4.895 2.033 5.374 2.003 5.884Z" fill="currentColor"/>
                                                <path d="M18 8.118L10 12.118L2 8.118V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.118Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className="premium-contact-details">
                                            <a href="mailto:info@mahantagroup.com">info@mahantagroup.com</a> <br />
                                            <a href="mailto:support@mahantagroup.com">support@mahantagroup.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="premium-footer-column">
                                <h4 className="premium-column-title">Quick Links</h4>
                                <ul className="premium-footer-links">
                                    <li><a href="/properties">Browse Properties</a></li>
                                    <li><a href="/services">Our Services</a></li>
                                    <li><a href="/about">About Company</a></li>
                                    <li><a href="/team">Meet Our Team</a></li>
                                    <li><a href="/careers">Career Opportunities</a></li>
                                    <li><a href="/blog">Latest News</a></li>
                                </ul>
                            </div>

                            {/* Property Categories */}
                            <div className="premium-footer-column">
                                <h4 className="premium-column-title">Properties</h4>
                                <ul className="premium-footer-links">
                                    <li><a href="/properties?type=apartment">Luxury Apartments</a></li>
                                    <li><a href="/properties?type=villa">Premium Villas</a></li>
                                    <li><a href="/properties?type=commercial">Commercial Spaces</a></li>
                                    <li><a href="/properties?type=land">Land & Plots</a></li>
                                    <li><a href="/properties?type=penthouse">Penthouses</a></li>
                                    <li><a href="/properties?type=studio">Designer Studios</a></li>
                                </ul>
                            </div>

                            {/* Newsletter Subscription */}
                            <div className="premium-footer-column">
                                <h4 className="premium-column-title">Stay Updated</h4>
                                <p className="premium-newsletter-desc">
                                    Get the latest property insights and exclusive offers delivered to your inbox.
                                </p>
                                <form className="premium-newsletter-form" onSubmit={handleSubscribe}>
                                    <div className="premium-input-group">
                                        <input 
                                            type="email"
                                            className="premium-newsletter-input"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="premium-newsletter-btn">
                                            <span>Subscribe</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path 
                                                    d="M5.00044 9.99935L2.72461 2.60352C8.16867 4.18685 13.3024 6.68806 17.9046 9.99935C13.3027 13.3106 8.16921 15.8118 2.72544 17.3952L5.00044 9.99935ZM5.00044 9.99935H11.2504"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                                <div className="premium-trust-badges">
                                    <div className="premium-badge-item">
                                        <span className="premium-badge-icon">🏆</span>
                                        <span>Premium Service</span>
                                    </div>
                                    <div className="premium-badge-item">
                                        <span className="premium-badge-icon">⭐</span>
                                        <span>Trusted Brand</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="premium-footer-bottom">
                    <div className="container">
                        <div className="premium-footer-bottom-content">
                            <div className="premium-copyright">
                                <p>© 2024 Mahanta Group. All rights reserved.</p>
                                <p className="premium-company-info">Premium Real Estate Services Since 2019</p>
                            </div>
                            <div className="premium-legal-links">
                                <a href="/privacy">Privacy Policy</a>
                                <a href="/terms">Terms of Service</a>
                                <a href="/cookies">Cookie Policy</a>
                                <a href="/disclaimer">Disclaimer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <button 
                className={`premium-scroll-top ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                        d="M12 20L12 4M12 4L5 11M12 4L19 11" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </>
    );
};

export default PremiumFooter;