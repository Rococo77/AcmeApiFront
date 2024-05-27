import { useState, useEffect } from 'react';

const Panier = () => {
  const [panier, setPanier] = useState(null);

  useEffect(() => {
    // Remplacez 'userId' par l'identifiant de l'utilisateur connecté
    const userId = 'userId'; 
    fetch(`/api/admin/panier/user/${userId}`)
      .then(response => response.json())
      .then(data => setPanier(data))
      .catch(error => console.error('Erreur lors de la récupération du panier:', error));
  }, []);

  if (!panier) {
    return <div>Chargement du panier...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Panier</h1>
            <h2 className="font-semibold text-2xl">{panier.items.length} Articles</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Détails du Produit</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantité</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Prix</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {panier.items.map((item, index) => (
            <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={item.plat.image} alt={item.plat.nom} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.plat.nom}</span>
                  <span className="text-red-500 text-xs">{item.plat.description}</span>
                  <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Supprimer</a>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <input className="mx-2 border text-center w-8" type="text" value={item.quantité} />
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center w-10 font-semibold text-sm">{item.plat.prix} €</span>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center w-10 font-semibold text-sm">{item.plat.prix * item.quantité} €</span>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Vider le panier
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
