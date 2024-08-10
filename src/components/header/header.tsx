
function Header() {
    return (
        <header
            className="flex items-center justify-between p-4 bg-transparent text-white w-full h-60 mt-5">
            {/* Logo */}
            <div className="flex-shrink-0 ml-10 mr-44 px-4">
                <img src="public/ressources/igmg-logo.png" alt="igmg-logo" className="h-24" />
            </div>
            {/* Überschrift */}
            <div className="flex-grow items-center justify-center border border-white border-7 rounded-2xl px-4 mr-10">
                <div className="text-center">
                    <h1 className="text-8xl py-2 rounded font-bebas font-bold letter-spacing">
                        IGMG HANNOVER ŞUBESİ
                    </h1>
                    <h1 className="text-8xl py-2 rounded font-bebas font-bold letter-spacing">
                        AYASOFYA CAMİ
                    </h1>
                </div>
            </div>
        </header>
    );
}

export default Header;
