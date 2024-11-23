import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';

import PrayerTimeAndClock from "./components/center/prayerTimesGridLeft/PrayerTimeAndClock.tsx";

function App() {
    return (
        <div className="flex flex-col justify-between min-h-screen background preventBurnInHue scrollbar-hide">
            <div className="mt-8 preventBurnInMove">
                <Header />
            </div>
            <main className="preventBurnInMove">
                <div className="">
                    <PrayerTimeAndClock />
                </div>
            </main>
            <footer className="mb-8 preventBurnInMove">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
