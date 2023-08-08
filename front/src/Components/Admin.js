import React, { useState } from 'react';
import axios from 'axios';
import '../Admin.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Admin() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [texte, setTexte] = useState('');
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setNom('');
    setTexte('');
    setImage(null);
    setAlertMessage('');
    setIsFormValid(true); // Réinitialise la validation du formulaire
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    if (!nom || !texte || !image) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('text', texte);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/slider/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Affiche une alerte de confirmation avec SweetAlert2
        Swal.fire({
          title: 'Succès!',
          text: 'Slider ajouté avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setAlertMessage('Slider ajouté avec succès !');
          closePopup();
        });
      } else {
        // Gère les autres cas ici, 
      }
    } catch (error) {
      // Gère les erreurs ici, 
    }
  };

  return (
    <div className="admin-center">
      <div className="admin-container">
        <div className="admin-content">
          <h2>Bienvenue dans votre espace admin</h2>
          <div className="admin-buttons">
            <button className="admin-button" onClick={openPopup}>Ajouter un Slider</button>
            <Link to="/" className="admin-button no-underline">Visualiser un Slider</Link>
            <Link to="/update-slider" className="admin-button no-underline">Modifier un Slider</Link>
            <Link to="/supprimer-slider" className="admin-button no-underline">Supprimer un Slider</Link>

          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Ajouter Slider</h2>
            <button className="close-button" onClick={closePopup}>Fermer</button>
            <div className="popup-input-container">
              <input
                type="text"
                className={`popup-input ${!isFormValid && !nom && 'invalid'}`}
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                className={`popup-input ${!isFormValid && !texte && 'invalid'}`}
                placeholder="Texte"
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className={`popup-input ${!isFormValid && !image && 'invalid'}`}
                onChange={handleImageChange}
              />
            </div>
            {!isFormValid && (
               <div className="error-message" style={{ color: 'red' }}>*Veuillez remplir tous les champs !</div>
            )}
            <div className="popup-button-container">
              <button className="popup-button" onClick={handleSubmit}>Ajouter</button>
              <button className="popup-button cancel-button" onClick={closePopup}>Annuler</button>
            </div>
            {alertMessage && (
              <div className="alert-message">{alertMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
