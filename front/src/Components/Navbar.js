
import React, { useState } from 'react';
import '../Navbar.css';
import LoginModal from './LoginModal';

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (<nav className='navbar'>
      <button className='nav-button'>À propos</button>
      <button className='nav-button'>Accueil</button>
      <button className='nav-button' onClick={openLoginModal}>
        Se connecter
      </button>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  );
}

export default Navbar;