import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './App.css';
import LoginModal from './Components/LoginModal';
import axios from 'axios';

function Home() {
  const [carouselLocked, setCarouselLocked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!carouselLocked) {
      // Fetch sliders data from the Spring API
      axios
        .get('http://localhost:8080/slider/all')
        .then((response) => {
          setSliders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching sliders:', error);
          setLoading(false);
        });
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselLocked, sliders.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliders.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentSlider = sliders[currentImageIndex];

  return (
    <div className='app'>
      <div className='carousel'>
        <motion.div className='inner-carousel'>
          <motion.div
            className={`item ${carouselLocked ? '' : 'active'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.7 } }}
            style={{ width: '1400px', height: '400px' }}
          >


          
            <img
              src={process.env.PUBLIC_URL + '/images/' + currentSlider.img} // Use the image URL from the API
              //alt={`carousel-img-${currentImageIndex}`}
              className='carousel-image'
            />
            <p className='carousel-text'>{currentSlider.text}</p>
          </motion.div>
          {!carouselLocked && (
            <div className='carousel-controls'>
              <button className='carousel-control left' onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className='carousel-control right' onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>
          )}
        </motion.div>
      </div>
      <div className='image-gallery'>
        {sliders.map((slider, index) => (
          <img
            key={index}
            src={process.env.PUBLIC_URL + '/images/' + slider.img} // Use the image URL from the API
            className='gallery-image'
          />
        ))}
      </div>
      <LoginModal />
    </div>
  );
}

export default Home;
