import React from 'react';
import Header from '../src/components/header/header'; // Pfad zur Header-Komponente anpassen
import Footer from '../src/components/footer/footer'; // Pfad zur Footer-Komponente anpassen

function App() {
    return (
        <div className="flex flex-col min-h-screen border-red-700 border">
            <div className="w-full">
                <Header />
            </div>
            <main className="flex-grow p-4">
                {/* Hauptinhalt hier */}
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Willkommen auf unserer Seite!</h2>
                    <p>Hier ist der Hauptinhalt der Seite.</p>
                </div>
            </main>
            <footer className="px-4 mr-10 ml-10 border-blue-700 border">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
