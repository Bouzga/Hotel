import React from 'react';
import { Link } from 'react-router-dom';

function ContentComponent() {
  return (
    <div>
      <h2>Contenu de la page</h2>
      <p>Bienvenue sur la page de contenu.</p>
      <Link to="/dashboard">Aller au tableau de bord</Link>
    </div>
  );
}

export default ContentComponent;
