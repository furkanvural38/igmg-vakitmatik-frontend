import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';

import PrayerTimeAndClock from "./components/center/prayerTimesGridLeft/PrayerTimeAndClock.tsx";

function App() {
    return (
        <div className="flex flex-col justify-around min-h-screen background preventBurnInHue scrollbar-hide">
            <div className="preventBurnInMove">
                <Header />
            </div>
            <main className="preventBurnInMove">
                <div className="">
                    <PrayerTimeAndClock />
                </div>
            </main>
            <footer className="preventBurnInMove">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
