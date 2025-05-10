import Header from './components/header/header';
import FooterContainer from '../src/container/FooterContainer.tsx';
import QubePrayerTimeContainer from '../src/container/QubePrayerTimeContainer';
import WeatherTileContainer from '../src/container/WeatherTileContainer';

function App() {
    return (
        <div className="flex flex-col justify-between min-h-screen background preventBurnInHue scrollbar-hide">
            <div className="flex-shrink-0 mt-8 preventBurnInMove mr-16 ml-16 mb-20">
                <Header />
            </div>
            <main className="flex-grow flex flex-col mr-16 ml-16 items-center justify-center preventBurnInMove">
                <QubePrayerTimeContainer />
                <WeatherTileContainer />
            </main>
            <footer className="flex-shrink-0 mb-8 preventBurnInMove mr-16 ml-16 mt-4">
                <FooterContainer />
            </footer>
        </div>
    );
}

export default App;
