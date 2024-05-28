import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const InscriptionForm = () => {
    const [formData, setFormData] = useState({
        Nom: '',
        Username: '',
        Prenom: '',
        Adresse: '',
        Zip: '',
        Ville: '',
        Email: '',
        Password: '',
      });
      const [error, setError] = useState("");
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await api.post('/open/register', formData, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
    
          console.log("Inscription réussie:", response.data);
          navigate("/login"); // Rediriger vers la page de connexion après l'inscription
      } catch (error) {
          // Gérez les erreurs d'axios
          setError(error.response ? error.response.data.message : "Erreur réseau");
          console.error("Erreur lors de l'inscription:", error.response ? error.response.status : '', error.response ? error.response.data.message : error.message);
      }
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 text-center">Inscription</h2>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="space-y-4 mt-6">
                  <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Nom"
                      value={formData.Nom}
                      onChange={handleChange}
                      placeholder="Nom"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Prenom"
                      value={formData.Prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Adresse"
                      value={formData.Adresse}
                      onChange={handleChange}
                      placeholder="Adresse"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Ville"
                      value={formData.Ville}
                      onChange={handleChange}
                      placeholder="Ville"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Country"
                      value={formData.Country}
                      onChange={handleChange}
                      placeholder="Pays"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Zip"
                      value={formData.Zip}
                      onChange={handleChange}
                      placeholder="Code postal"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="text"
                      name="Username"
                      value={formData.Username}
                      onChange={handleChange}
                      placeholder="Nom d'utilisateur"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="password"
                      name="Password"
                      value={formData.Password}
                      onChange={handleChange}
                      placeholder="Mot de passe"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                  S&apos;inscrire
              </button>
        <Link to="/login" className="text-yellow-600 hover:text-yellow-900 ml-4">
        Se connecter
      </Link>
    </form>
    </div>
  );
};

export default InscriptionForm;
