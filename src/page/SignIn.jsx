import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        Roles: []
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://192.168.1.31:8000/api/open/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Utilisateur créé avec succès:', data.message);
           
          } else {
            console.error('Erreur lors de la création de l\'utilisateur:', response.status);
            
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
          
        }
      };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 text-center">Inscription</h2>
        <div className="space-y-4 mt-6">
            <input type="text" name="Nom" value={formData.Nom} onChange={handleChange} placeholder="Nom" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="Username" value={formData.Username} onChange={handleChange} placeholder="Nom d&apos;utilisateur" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="Prenom" value={formData.Prenom} onChange={handleChange} placeholder="Prénom" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="Adresse" value={formData.Adresse} onChange={handleChange} placeholder="Adresse" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="Zip" value={formData.Zip} onChange={handleChange} placeholder="Code Postal" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="Ville" value={formData.Ville} onChange={handleChange} placeholder="Ville" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" name="Password" value={formData.Password} onChange={handleChange} placeholder="Mot de passe" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">S&apos;inscrire</button>
        <Link to="/login" className="text-yellow-600 hover:text-yellow-900 ml-4">
        Se connecter
      </Link>
    </form>
    </div>
  );
};

export default InscriptionForm;
