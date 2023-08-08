import React, { useState, useEffect } from 'react';
import '../SupprimerSlider.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

function SupprimerSlider() {
  const [sliders, setSliders] = useState([]);
  const [selectedDemandId, setSelectedDemandId] = useState(null);
  useEffect(() => {
    async function fetchSliders() {
      try {
        const response = await axios.get('http://localhost:8080/slider/all');
        setSliders(response.data);
      } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des sliders:", error);
      }
    }

    fetchSliders();
  }, []);

  const handleDelete = async (slider) => {
    // Afficher une alerte de confirmation
    const result = await Swal.fire({
      title: 'Confirmation',
      text: `Êtes-vous sûr de vouloir supprimer le slider "${slider.nom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        setSelectedDemandId(slider.idSlider); 
        console.log("hhh" + slider.idSlider);
        await axios.delete(`http://localhost:8080/slider/delete/` + slider.idSlider);


        // Mise à jour de l'état pour refléter la suppression
        // setSliders(sliders.filter(s => s.id !== slider.id));

        // Afficher une alerte de succès
        Swal.fire({
          title: 'Succès',
          text: `Le slider "${slider.nom}" a été supprimé avec succès !`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        window.location.reload();
      } catch (error) {
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur
        console.error("Erreur lors de la suppression du slider:", error);
      }
    }
  };

  return (
    <div className="supprimer-slider">
      <h2>Supprimer un Slider</h2>
      <p>Vous êtes sur le point de supprimer un slider.</p>

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
              <tr key={slider.id}>
                <td><img src={slider.img} alt={`Image ${slider.nom}`} /></td>
                <td>{slider.nom}</td>
                <td>{slider.text}</td>
                <td>
                  <button onClick={() => handleDelete(slider)} >Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default SupprimerSlider;
