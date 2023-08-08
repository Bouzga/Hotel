import React, { useState } from 'react';
import '../Navbar.css';
import LoginModal from './LoginModal';
import APropos from './APropos';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav className='navbar'>
      <Link to='/apropos' className='nav-button'>
        À propos 
      </Link>
      <Link to='/' className='nav-button'>
        Accueil
      </Link>
      <button className='nav-button' onClick={openLoginModal}>
        Se connecter
      </button>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  );
}

export default Navbar;
