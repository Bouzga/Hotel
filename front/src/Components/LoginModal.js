import React, { useState, useEffect } from 'react';
import '../LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data);

        // Rediriger vers le composant "Admin" après une connexion réussie
        window.location.href = '/admin';
      } else {
        setMessage('Échec de l\'authentification !');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setMessage('Une erreur s\'est produite lors de la connexion.');
    }
  };

  const resetState = () => {
    setUsername('');
    setPassword('');
    setMessage('');
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='login-modal-overlay'>
      <div className='login-modal'>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='login'
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type='password'
            placeholder='Mot de passe'
            value={password}
            onChange={handlePasswordChange}
          />
          <button type='submit'>Se connecter</button>
          <button type='button' onClick={onClose}>Annuler</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
