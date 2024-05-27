import  { useState } from 'react';

const AjouterRegion = () => {
  const [regionData, setRegionData] = useState({
    nom: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.1.31:8000/api/admin/regions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(regionData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Région créée avec succès:', data);
        // Vous pouvez ajouter ici une redirection vers la liste des régions ou une confirmation d'ajout
      } else {
        console.error('Erreur lors de la création de la région:', response.status);
        // Gérez l'erreur (affichage d'un message d'erreur, etc.)
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      // Gérez l'erreur (affichage d'un message d'erreur, etc.)
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Ajouter une Région</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nom" className="block font-medium">Nom de la Région</label>
          <input type="text" id="nom" name="nom" value={regionData.nom} onChange={handleInputChange} className="w-full border rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" name="description" value={regionData.description} onChange={handleInputChange} className="w-full border rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Ajouter
        </button>
      </form>
    </div>
  );
};
export default AjouterRegion;