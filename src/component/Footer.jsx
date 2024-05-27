const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-row justify-center mb-4">
          <a href="#" className="hover:text-red-400">Accueil</a>
          <a href="#" className="mx-4 hover:text-red-400">Menu</a>
          <a href="#" className="mx-4 hover:text-red-400">À propos</a>
          <a href="#" className="mx-4 hover:text-red-400">Contact</a>
        </div>
        <div className="flex flex-row justify-center">
          <img src="/image/dragon_doree.png" alt="Logo du restaurant" className="w-24 h-auto" />
        </div>
        <p className="text-sm mt-4">
          Copyright &copy; 2024 - Restaurant ACME
        </p>
      </div>
    </footer>
  );
};

export default Footer;
