import { useState, useEffect } from 'react';

// Definiere das Interface für die Titelpaare
interface PrayerTitle {
    arabic: string;
    latin: string;
}

// Erstelle eine Liste der Titelpaare
const prayerTitles: { [key: string]: PrayerTitle } = {
    fajr: { arabic: 'الصلاة الفجر', latin: 'Fajr' },
    shuruq: { arabic: 'الشروق', latin: 'Shuruq' },
    dhuhr: { arabic: 'الصلاة الظهر', latin: 'Dhuhr' },
    asr: { arabic: 'الصلاة العصر', latin: 'Asr' },
    maghrib: { arabic: 'الصلاة المغرب', latin: 'Maghrib' },
    ishaa: { arabic: 'الصلاة العشاء', latin: 'Isha\'a' },
};

const useChangeTitle = () => {
    const [currentTitles, setCurrentTitles] = useState<{ [key: string]: string }>({
        fajr: prayerTitles.fajr.arabic,
        shuruq: prayerTitles.shuruq.arabic,
        dhuhr: prayerTitles.dhuhr.arabic,
        asr: prayerTitles.asr.arabic,
        maghrib: prayerTitles.maghrib.arabic,
        ishaa: prayerTitles.ishaa.arabic,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitles((prevTitles) => {
                const newTitles: { [key: string]: string } = {};
                for (const key in prayerTitles) {
                    newTitles[key] = prevTitles[key] === prayerTitles[key].arabic
                        ? prayerTitles[key].latin
                        : prayerTitles[key].arabic;
                }
                return newTitles;
            });
        }, 3000); // Wechsle die Titel alle 3 Sekunden

        return () => clearInterval(interval); // Bereinige den Intervall bei der Demontage
    }, []);

    return currentTitles;
};

export default useChangeTitle;
