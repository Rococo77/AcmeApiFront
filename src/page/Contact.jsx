

const ContactPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-1/2 p-8 ">
        <h1 className="text-2xl font-semibold mb-4">Nos Coordonnées</h1>
        <p className="mb-2">Adresse : 2 rue Alphonse Colas, 59800 Lille</p>
        <p className="mb-2">Téléphone : +33 9 82 63 95 08</p>
        <p>Email : <a href="backbonetech@free.fr" className="text-blue-500">AcmeChinaRestaurent</a></p>
      </div>
    </div>
  );
};

export default ContactPage;
