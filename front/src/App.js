import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './App.css';
import Navbar from './Components/Navbar';
import LoginModal from './Components/LoginModal';

import img1 from './img/im1.jpg';
import img2 from './img/im2.jpg';
import img3 from './img/im3.jpg';
import img4 from './img/im4.jpg';
import img5 from './img/im5.jpg';
import img6 from './img/im6.jpg';
import img7 from './img/im7.jpg';
import img8 from './img/im8.jpg';
import img9 from './img/im9.jpg';
import img10 from './img/im10.jpg';

const imagesArray = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
];
const textsArray = [
  'Texte 1',
  'Texte 2',
  'Texte 3',
  'Texte 4',
  'Texte 5',
  'Texte 6',
  'Texte 7',
  'Texte 8',
  'Texte 9',
  'Texte 10',
];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselLocked, setCarouselLocked] = useState(false);

  useEffect(() => {
    if (!carouselLocked) {
      // Changement automatique d'image toutes les 5 secondes
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [carouselLocked]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='app'>
      <Navbar />
      <div className='carousel'>
        <motion.div className='inner-carousel'>
          <motion.div
            key={currentImageIndex}
            className={`item ${carouselLocked ? '' : 'active'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.7 } }}
            style={{ width: '1400px', height: '400px' }}
          >
            <img
              src={imagesArray[currentImageIndex]}
              alt={`carousel-img-${currentImageIndex}`}
              className='carousel-image'
            />
            <p className='carousel-text'>{textsArray[currentImageIndex]}</p>
          </motion.div>
          {!carouselLocked && (
            <div className='carousel-controls'>
              <button className='carousel-control' onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className='carousel-control' onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>
          )}
        
        </motion.div>
      </div>
      <div className='image-gallery'>
        {imagesArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`gallery-img-${index}`}
            className='gallery-image'
          />
        ))}
      </div>
      <LoginModal />
    </div>
  );
}

export default App;
