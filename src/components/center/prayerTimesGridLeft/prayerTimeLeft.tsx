import { getDate } from '../getDate.tsx'; // Pfad zur getDate-Datei anpassen
import { PrayerTimes } from '../types.ts'; // Pfad zu den Typen anpassen
import useChangeTitle from './useChangeTitle.tsx'; // Pfad zur useChangeTitle-Datei anpassen
import { useEffect, useState } from "react";
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime.tsx'; // Neue Funktion importieren
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles.tsx'; // Hilfsfunktion importieren

const PrayerTimeLeft = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const titles = useChangeTitle();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPrayerTimes: PrayerTimes | null = await getDate();
            setPrayerTimes(fetchedPrayerTimes);
            if (fetchedPrayerTimes) {
                const currentTime = getCurrentPrayerTime(fetchedPrayerTimes);
                setCurrentPrayerTime(currentTime);
            }
        };

        // Initialer Datenabruf
        fetchData();

        // Interval setzen, um die aktuelle Gebetszeit regelmäßig zu überprüfen
        const intervalId = setInterval(() => {
            if (prayerTimes) {
                const currentTime = getCurrentPrayerTime(prayerTimes);
                setCurrentPrayerTime(currentTime);
            }
        }, 60000); // Alle 60 Sekunden aktualisieren

        // Cleanup beim Unmounten der Komponente
        return () => clearInterval(intervalId);
    }, [prayerTimes]); // Abhängigkeit: Aktualisiere den Effekt, wenn sich `prayerTimes` ändert

    if (!prayerTimes) {
        return <div>Loading...</div>; // Zeige einen Ladeindikator an, wenn die Daten noch nicht geladen sind
    }

    const renderPrayerTime = (timeName: string, timeValue: string, title: string, prayerKey: string) => {
        const { containerClassName, containerStyle, textClassName, textStyle, timeClassName, timeStyle } = applyCurrentPrayerStyles(currentPrayerTime === prayerKey);

        return (
            <div
                className={`border-7 rounded-2xl p-4 flex items-center justify-between ${containerClassName}`}
                style={containerStyle}
            >
                <div className="flex flex-col mt-16">
                    <span className={`text-7xl text-center font-bold ${textClassName}`} style={textStyle}>
                        {timeName}
                    </span>
                    <span className="text-4xl text-center mt-5 font-bold text-black" style={{ ...textStyle, minWidth: '220px' }}>
                        {title}
                    </span>
                </div>
                <span className={`text-8xl font-bold ${timeClassName}`} style={timeStyle}>
                    {timeValue}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-4">
            {renderPrayerTime('İmsak', prayerTimes.fajr, titles.fajr, 'fajr')}
            {renderPrayerTime('İkindi', prayerTimes.asr, titles.asr, 'asr')}
            {renderPrayerTime('Güneş', prayerTimes.sunrise, titles.shuruq, 'sunrise')}
            {renderPrayerTime('Akşam', prayerTimes.maghrib, titles.maghrib, 'maghrib')}
            {renderPrayerTime('Öğle', prayerTimes.dhuhr, titles.dhuhr, 'dhuhr')}
            {renderPrayerTime('Yatsı', prayerTimes.isha, titles.ishaa, 'isha')}
        </div>
    );
};

export default PrayerTimeLeft;
