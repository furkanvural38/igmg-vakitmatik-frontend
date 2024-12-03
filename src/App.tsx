import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';

import PrayerTimeAndClock from "./components/center/prayerTimeAndClockCenter/PrayerTimeAndClock.tsx";
import QubePrayerTime from "./components/centerRedesign/qubePrayerTime.tsx";

function App() {
    return (
        <div className="flex flex-col justify-between min-h-screen background preventBurnInHue scrollbar-hide">
            <div className="flex-shrink-0 mt-8 preventBurnInMove">
                <Header />
            </div>
            <main className="mt-8 mb-8 mr-8 ml-8 flex-grow flex flex-col items-center justify-center preventBurnInMove">
                <QubePrayerTime />
            </main>
            <footer className="flex-shrink-0 mb-8 preventBurnInMove">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
