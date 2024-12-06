import igmgLogo from '../../assets/ressources/igmg-logo.png';

function Header() {
    return (
        <header className="flex items-center bg-transparent">
            {/* Logo */}
            <div className="flex items-stretch border-5 border-white py-12 px-20 rounded-3xl">
                <img src={igmgLogo} alt="igmg-logo" className="h-32" />
            </div>
            {/* Überschrift */}
            <div className="flex-1 flex items-stretch justify-center border-5 border-white rounded-3xl ml-16 py-4">
                <h1 className="text-white text-header font-clash font-bold text-center letter-spacing">
                    HANNOVER ŞUBESİ AYASOFYA CAMİİ
                </h1>
            </div>
        </header>
    );
}

export default Header;
