import React, { useState, useEffect } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

import CustomCursor from './Components/Common/CustomCursor';
import FloatingWhatsApp from './Components/Common/FloatingWhatsApp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './Components/404/NotFound';
import ScrollToTop from './Components/ScrollToTop';
// Preloader Component
import PremiumPreloader from './Components/Homepage/Preloader';

// Layout
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// Pages
import Home from './Components/Homepage/Home';
import About from './Components/About/About';
import Service from "./Components/Services/Service";
import Contact from './Components/Contact/Contact';
import Gallery from './Components/Gallary/Gallery';
import ProjectGallery from './Components/Project/Gallery'
import PropertyListing from "./Components/Property/Property";
import BlogPage from "./Components/Blog/Blog";
import AdminPanel from './Components/Admin/AdminPanel';
import PropertyDetail from './Components/PropertyDetail/PropertyDetail';
import Director from './Components/About Director/Director';
import Complete from './Components/Project/Complete';
import ProjectDetail from './Components/Project/ProjectDetail';
import Terms from './Components/Legal/Terms';
import Team from './Components/About/Team';
import Career from './Components/Careers/Career';
import "./App.css"

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS lazily if available
    let aos;
    (async () => {
      try {
        const mod = await import('aos');
        await import('aos/dist/aos.css');
        aos = mod.default;
        aos.init({ duration: 700, easing: 'ease-out-quart', once: true, offset: 40 });
      } catch (_) {
        // AOS not installed; skip silently
      }
    })();

    const preloadAssets = async () => {
      try {
        const images = [
          "/images/logo/logo@2x.png",
          "/images/home/house-1.jpg",
          "/images/home/house-2.jpg",
          "/images/home/house-3.jpg",
        ];

        await Promise.all(
          images.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve; // ignore errors so app never hangs
            });
          })
        );

        // Smooth delay for premium feel
        setTimeout(() => setLoading(false), 500);

      } catch (error) {
        console.log("Preloading error:", error);
        setLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />   
      {/* Global custom cursor */}
      <CustomCursor />
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      {/* Preloader */}
      {/* {loading && <PremiumPreloader />} */}

      {/* Main content hidden until preloader finishes */}
      <div className={`app-content ${loading ? "hidden-content" : "content-visible"}`}>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/aboutdirector" element={<Director />} />
          <Route path="/services" element={<Service />} />
          <Route path="/projectgallery" element={<ProjectGallery />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property" element={<PropertyListing />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/team" element={<Team />} />
          <Route path="/career" element={<Career />} />
          

          {/* 404 Page Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
