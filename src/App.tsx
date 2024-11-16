import Header from '../src/components/header/header'; // Pfad zur Header-Komponente anpassen
import Footer from '../src/components/footer/footer'; // Pfad zur Footer-Komponente anpassen
import PrayerTimeLeft from '././components/center/prayerTimesGridLeft/prayerTimeLeft'; // Pfad zur PrayerTimeLeft-Komponente anpassen
import TimeRight from '././components/center/currentTimeRight/timeRight'; // Pfad zur TimeRight-Komponente anpassen

function App() {
    return (
        <div className="flex flex-col justify-around min-h-screen background preventBurnInHue scrollbar-hide">
            <div className="preventBurnInMove">
                <Header />
            </div>
            <main className="flex items-center justify-center preventBurnInMove">
                {/* Links: PrayerTimeLeft */}
                <div className="">
                    <PrayerTimeLeft />
                </div>
                {/* Rechts: TimeRight */}
                <div className="">
                    <TimeRight />
                </div>
            </main>
            <footer className="preventBurnInMove">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
