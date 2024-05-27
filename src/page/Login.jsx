import { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Connexion réussie:', data);
        // Ici, vous pouvez gérer la redirection de l'utilisateur ou la sauvegarde du token de session
      } else {
        console.error('Erreur lors de la connexion:', response.status);
        // Gérez l'erreur (affichage d'un message d'erreur, etc.)
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      // Gérez l'erreur (affichage d'un message d'erreur, etc.)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 text-center">Connexion</h2>
        <div className="space-y-4 mt-6">
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Se connecter</button>
        <Link to="/signin" className="text-yellow-600 hover:text-yellow-900 ml-4">
        S&apos;inscrire
      </Link>
      </form>
      
    </div>
  );
};

export default LoginForm;
