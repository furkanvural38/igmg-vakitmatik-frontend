import { useState, useEffect } from 'react';

// Definiere das Interface für die Titelpaare
interface PrayerTitle {
    arabic: string;
    latin: string;
}

// Erstelle eine Liste der Titelpaare
const prayerTitles: { [key: string]: PrayerTitle } = {
    fajr: { arabic: 'الصلاة الفجر', latin: 'İmsak' },
    shuruq: { arabic: 'الشروق', latin: 'Güneş' },
    dhuhr: { arabic: 'الصلاة الظهر', latin: 'DhuhrÖğle' },
    asr: { arabic: 'الصلاة العصر', latin: 'İkindi' },
    maghrib: { arabic: 'الصلاة المغرب', latin: 'Akşam' },
    ishaa: { arabic: 'الصلاة العشاء', latin: 'Isha\'aYatsı' },
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