import PlatsTendances from "../component/PlatsTendance";

const HomePage = () => {
    return (
        <div className="bg-gray-300 p-8 w-screen mx-0">
            {/* Notre Concept */}
            <section className="mb-8">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Notre Concept</h2>
                <p className="text-gray-800 text-center">
                    Découvrez la véritable cuisine chinoise, un voyage culinaire vers l&apos;Empire Céleste ! Dégustez des plats authentiques préparés avec des
                    ingrédients frais et de saison, selon les traditions ancestrales.
                </p>
                <img src="/image/dragon_doree.png" alt="Dragon doré" className="mx-auto w-64 h-auto mb-4" />
            </section>

            {/* Qui Sommes-Nous ? */}

            <section className="mb-8">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Qui Sommes-Nous ?</h2>
                <div className="flex flex-row justify-center space-x-8">
                    {/* Portraits des chefs */}
                    <div className="flex flex-col items-center">
                        <img src="/image/IMG_20231031_141511 (Petite).jpg" alt="Chef 1" className="w-48 h-48 rounded-full border border-red-400" />
                        <p className="text-gray-700 text-sm mt-2">Corentin</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/image/PP.jpeg" alt="Chef 2" className="w-48 h-48 rounded-full border border-red-400" />
                        <p className="text-gray-700 text-sm mt-2">Lansoy</p>
                    </div>
                </div>
                <p className="text-gray-700 text-center mt-4">
                    Notre équipe de chefs passionnés est originaire de différentes régions de Chine, apportant leur savoir-faire et leurs recettes familiales
                    pour vous offrir une expérience culinaire authentique et inoubliable.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-red-600 mb-4">Nos Plats Tendances</h2>
                <PlatsTendances />
            </section>
        </div>
    );
};

export default HomePage;
