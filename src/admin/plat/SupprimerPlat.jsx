import { useParams, useNavigate } from 'react-router-dom';

const SupprimerPlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://192.168.1.31:8000/admin/recipes/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/admin/plats');
    })
    .catch((error) => {
      console.error('Failed to delete the plat:', error);
    });
  };

  return (
    <div className="container mx-auto mt-10 w-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Supprimer le Plat</h1>
      <div className="text-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
          Supprimer le plat
        </button>
      </div>
    </div>
  );
};

export default SupprimerPlat;
