import igmgLogo from '../../assets/ressources/igmg-logo.png';

function Header() {
    return (
        <header
            className="flex mt-10 mr-10 ml-10 justify-between items-center bg-transparent">
            {/* Logo */}
            <div className="flex ml-10 px-4">
                <img src={igmgLogo} alt="igmg-logo" className="h-40" />
            </div>
            {/* Überschrift */}
            <div className="border border-white border-7 rounded-2xl">
                <h1 className="text-12xl p-8 pr-96 pl-96 rounded font-bebas font-bold letter-spacing">
                    IGMG HANNOVER ŞUBESİ AYASOFYA CAMİ
                </h1>
            </div>
        </header>
    );
}


export default Header;
