import '../style.css'

const Header = () => {
  return (
    <header className="bg-cover bg-center header">
      <div className="container mx-auto flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-red-600">Restaurant ACME</h1>
        <p className="text-yellow-400 text-lg mt-4">Cuisine traditionnelle chinoise authentique</p>
      </div>
    </header>
  );
};

export default Header;
