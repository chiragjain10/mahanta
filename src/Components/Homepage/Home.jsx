import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import HeroSlider from './Hero'
import PropertyListings from './Property'
import PropertyCategories from './PropertyCategories'
import ChooseUs from './ChooseUs'
import TestimonialSection from './Testimonial'
import Welcome from './Welcome'

function Home() {

  useEffect(() => {
    AOS.init({
      duration: 2000,     // Animation speed
      offset: 100,       // How early the animation triggers
      easing: 'ease-in-out',
      once: true         // Animation runs only once
    });
  }, []);

  return (
    <>

      <HeroSlider />

      <Welcome />
      <PropertyListings />



      {/* <PropertyCategories /> */}



      <ChooseUs />



      <TestimonialSection />

    </>
  )
}

export default Home
