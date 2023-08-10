import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../UpdateSlider.css';

const UpdateSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [originalSliderData, setOriginalSliderData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/slider/all')
      .then(response => {
        setSliderData(response.data);
        setOriginalSliderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching slider data:', error);
      });
  }, []);

  const handleSave = (idSlider) => {
    const sliderToUpdate = sliderData.find(slider => slider.idSlider === idSlider);

    axios.put(`http://localhost:8080/slider/update/${idSlider}`, sliderToUpdate)
      .then(response => {
        console.log('Slider updated successfully:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'Les modifications ont été enregistrées avec succès.',
        });
      })
      .catch(error => {
        console.error('Error updating slider:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de mise à jour',
          text: 'Une erreur est survenue lors de la mise à jour. Veuillez réessayer.',
        });
      });
  };

  const handleFieldChange = (idSlider, field, value) => {
    const updatedData = sliderData.map(slider => {
      if (slider.idSlider === idSlider) {
        return {
          ...slider,
          [field]: value
        };
      }
      return slider;
    });

    setSliderData(updatedData);
  };

  const handleFileChange = (idSlider, file) => {
    const updatedData = sliderData.map(slider => {
      if (slider.idSlider === idSlider) {
        return {
          ...slider,
          img: URL.createObjectURL(file)
        };
      }
      return slider;
    });

    setSliderData(updatedData);
  };

  const handleCancel = (idSlider) => {
    const originalSlider = originalSliderData.find(slider => slider.idSlider === idSlider);
    const updatedData = sliderData.map(slider => {
      if (slider.idSlider === idSlider) {
        return {
          ...slider,
          nom: originalSlider.nom,
          text: originalSlider.text
        };
      }
      return slider;
    });

    setSliderData(updatedData);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Update Slider</h2>
      <div className="slider-table-container">
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
            {sliderData.map(slider => (
              <tr key={slider.idSlider}>
                <td><img src={slider.img} alt={slider.nom} />
                <input
                    type="file"
                    onChange={(e) => handleFileChange(slider.idSlider, e.target.files[0])}
                  /></td>
                <td>
                  <input
                    className="slider-input"
                    type="text"
                    value={slider.nom}
                    onChange={(e) => handleFieldChange(slider.idSlider, 'nom', e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="slider-input"
                    value={slider.text}
                    onChange={(e) => handleFieldChange(slider.idSlider, 'text', e.target.value)}
                  />
                </td>
                <td>
               
                  <button className="slider-button slider-button-adjusted same-size-button" onClick={() => handleSave(slider.idSlider)}>Enregistrer</button>
                  <button className="slider-button slider-button-adjusted same-size-button" onClick={() => handleCancel(slider.idSlider)}>Annuler</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateSlider;
