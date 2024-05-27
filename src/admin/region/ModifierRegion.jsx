// src/components/ModifierRegion.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierRegion = () => {
  const [region, setRegion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.31:8000/admin/regions/${id}`)
      .then((response) => response.json())
      .then((data) => setRegion(data));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    // Logique pour envoyer les données mises à jour à l'API
    fetch(`http://192.168.1.31:8000/admin/regions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(region),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/admin/regions'); // Rediriger vers la liste des régions après la mise à jour
    })
    .catch((error) => {
      console.error('Failed to update the region:', error);
    });
  };

  if (!region) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-10 w-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Modifier la Région</h1>
      <form className="w-full max-w-lg mx-auto" onSubmit={handleUpdate}>
        {/* ... (les champs de formulaire avec les classes Tailwind) */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Mettre à jour la région
        </button>
      </form>
    </div>
  );
};

export default ModifierRegion;
