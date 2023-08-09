import React, { useState, useEffect } from 'react';
import '../UpdateSlider.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

function SliderRow({ slider, handleImageChange, handleFieldChange, saveChanges }) {
  return (
    <tr key={slider.id}>
      <td>
        <img src={slider.img} alt={`Image ${slider.nom}`} />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, slider.id)}
        />
      </td>
      <td>
        <input
          type="text"
          value={slider.nom}
          onChange={(e) => handleFieldChange(e, slider.id, 'nom')}
        />
      </td>
      <td>
        <input
          type="text"
          value={slider.text}
          onChange={(e) => handleFieldChange(e, slider.id, 'text')}
        />
      </td>
      <td>
        <button onClick={() => saveChanges(slider.id)}>Enregistrer</button>
      </td>
    </tr>
  );
}

function UpdateSlider() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    async function fetchSliders() {
      try {
        const response = await axios.get('http://localhost:8080/slider/all');
        setSliders(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sliders:', error);
      }
    }
    fetchSliders();
  }, []);

  const handleFieldChange = (event, sliderId, field) => {
    setSliders((prevSliders) => {
      return prevSliders.map((slider) => {
        if (slider.id === sliderId) {
          return { ...slider, [field]: event.target.value };
        }
        return slider;
      });
    });
  };

  const handleImageChange = (event, sliderId) => {
    const updatedSliders = sliders.map((slider) => {
      if (slider.id === sliderId) {
        return { ...slider, img: event.target.files[0] };
      }
      return slider;
    });
    setSliders(updatedSliders);
  };

  const saveChanges = async (sliderId) => {
    const sliderToUpdate = sliders.find((slider) => slider.id === sliderId);
    try {
      // Créer un objet FormData pour envoyer les données, y compris le fichier
      const formData = new FormData();
      formData.append('nom', sliderToUpdate.nom);
      formData.append('text', sliderToUpdate.text);
      formData.append('img', sliderToUpdate.img);

      await axios.put(`http://localhost:8080/slider/update/${sliderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Afficher une alerte de succès
      Swal.fire({
        title: 'Succès',
        text: `Le slider "${sliderToUpdate.nom}" a été modifié avec succès !`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Erreur lors de la modification du slider:', error);
    }
  };

  return (
    <div className="update-slider">
      <div className="center-content">
        <h2>Modifier un Slider</h2>
        <p>Vous pouvez modifier les champs des sliders ci-dessous :</p>
      </div>
      <div className="table-container">
        <table className="slider-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Texte</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <SliderRow
                key={slider.id}
                slider={slider}
                handleImageChange={handleImageChange}
                handleFieldChange={handleFieldChange}
                saveChanges={saveChanges}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpdateSlider;
