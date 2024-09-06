import Header from '../src/components/header/header'; // Pfad zur Header-Komponente anpassen
import Footer from '../src/components/footer/footer'; // Pfad zur Footer-Komponente anpassen
import PrayerTimeLeft from '././components/center/prayerTimesGridLeft/prayerTimeLeft'; // Pfad zur PrayerTimeLeft-Komponente anpassen
import TimeRight from '././components/center/currentTimeRight/timeRight'; // Pfad zur TimeRight-Komponente anpassen

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <Header />
            </div>
            <main className="flex-grow flex">
                {/* Links: PrayerTimeLeft */}
                <div className="flex-1 p-4 px-4 ml-10">
                    <PrayerTimeLeft />
                </div>
                {/* Rechts: TimeRight */}
                <div className="flex-1 p-4 px-4 mr-10">
                    <TimeRight />
                </div>
            </main>
            <footer className="px-4 mr-10 ml-10 mb-5">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
