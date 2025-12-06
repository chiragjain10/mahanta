import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Test.css";

export default function TestimonialPremiumLight() {
  const testimonials = [
    {
      img: "images/avatar/avt-png1.png",
      name: "Rohit Mehra",
      role: "CEO Mahanta Group",
      text: "Working with Mahanta Group transformed our real estate portfolio. Their expertise and professionalism exceeded all expectations, delivering exceptional results.",
    },
    {
      img: "images/avatar/avt-png2.png",
      name: "Ananya Desai",
      role: "Managing Director, Mahanta Group",
      text: "The team's dedication to excellence and client satisfaction sets them apart in the competitive real estate market. Truly outstanding service.",
    },
    {
      img: "images/avatar/avt-png4.png",
      name: "Arvind Kulkarni",
      role: "Real Estate Investor",
      text: "Mahanta Group's market insights and strategic approach helped us achieve remarkable returns on our investments. Highly recommended for serious investors.",
    },
    {
      img: "images/avatar/avt-png6.png",
      name: "Priya Nair",
      role: "Property Consultant",
      text: "Professional, transparent, and results-driven. Mahanta Group consistently delivers beyond client expectations in every project.",
    },
    {
      img: "images/avatar/avt-png3.png",
      name: "Siddharth Jain",
      role: "Founder, SJ Builders",
      text: "Their attention to detail and commitment to quality makes Mahanta Group the preferred choice for premium real estate developments.",
    },
    {
      img: "images/avatar/avt-png5.png",
      name: "Megha Kapoor",
      role: "Homeowner",
      text: "From search to settlement, the experience was seamless. Found our dream home with their expert guidance and support.",
    },
  ];

  return (
    <section className="premium-testimonial-light">
      <div className="container">
        {/* Section Header */}
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Our Testimonials</div>
          <h3 className="mt-4 title">What's people say's</h3>
        </div>

        {/* Premium Swiper */}
        <div className="premium-testimonial-swiper">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              el: '.premium-swiper-pagination',
              bulletClass: 'premium-swiper-bullet',
              bulletActiveClass: 'premium-swiper-bullet-active'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            loop={true}
            centeredSlides={false}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
            className="premium-testimonial-slider"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="premium-testimonial-card">
                  {/* Quote Icon */}
                  <div className="premium-quote-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 30H12V24C12 19.5817 15.5817 16 20 16H22C22.5523 16 23 16.4477 23 17V23C23 23.5523 22.5523 24 22 24H18V30ZM36 30H30V24C30 19.5817 33.5817 16 38 16H40C40.5523 16 41 16.4477 41 17V23C41 23.5523 40.5523 24 40 24H36V30Z"
                        fill="url(#quoteGradientLight)"
                      />
                      <defs>
                        <linearGradient id="quoteGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1174d6" />
                          <stop offset="100%" stopColor="#0a56a5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p className="premium-testimonial-text">"{item.text}"</p>

                  {/* Rating Stars */}
                  <div className="premium-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="premium-star">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L11.5 6.5L17.5 7.5L13 11L14 17L9 13.5L4 17L5 11L0.5 7.5L6.5 6.5L9 1Z" />
                        </svg>
                      </span>
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="premium-client-info">
                    <div className="premium-client-avatar">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="premium-client-details">
                      <h5 className="premium-client-name">{item.name}</h5>
                      <p className="premium-client-role">{item.role}</p>
                    </div>
                  </div>

                  {/* Card Background Effect */}
                  <div className="premium-card-bg-effect"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="premium-swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}