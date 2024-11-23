import igmgLogo from '../../assets/ressources/igmg-logo.png';

function Header() {
    return (
        <header className="flex items-center ml-8 bg-transparent">
            {/* Logo */}
            <div className="flex items-center">
                <img src={igmgLogo} alt="igmg-logo" className="h-60" />
            </div>
            {/* Überschrift */}
            <div className="flex-1 flex items-center justify-center border border-white border-7 rounded-header mr-8 ml-32">
                <h1 className="text-header px-20 py-4 rounded font-bebas font-bold tracking-wide text-center letter-spacing">
                    IGMG HANNOVER ŞUBESİ AYASOFYA CAMİ
                </h1>
            </div>
        </header>
    );
}

export default Header;
