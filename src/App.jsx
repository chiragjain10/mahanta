import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './Components/404/NotFound';
import ScrollToTop from './Components/ScrollToTop';
// Preloader Component
import PremiumPreloader from './Components/Homepage/Preloader';

// Layout
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// Pages
import Home from './Components/Homepage/Home';
import About from './Components/About/About';
import Service from "./Components/Services/Service";
import Contact from './Components/Contact/Contact';
import Gallery from "./Components/Gallery/Gallery";
import PropertyListing from "./Components/Property/Property";
import BlogPage from "./Components/Blog/Blog";
import AdminPanel from './Components/Admin/AdminPanel';
import PropertyDetail from './Components/PropertyDetail/PropertyDetail';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      {/* Preloader */}
      {loading && <PremiumPreloader />}

      {/* Main content hidden until preloader finishes */}
      <div className={`app-content ${loading ? "hidden-content" : "content-visible"}`}>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/gellery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property" element={<PropertyListing />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* 404 Page Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
