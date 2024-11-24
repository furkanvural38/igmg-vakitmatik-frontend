import { useEffect, useState } from 'react';
import { PrayerTimes, PrayerTimesApiResponse } from '../types'; // Importiere die Typen
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime'; // Importiere die Methode
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles';
import useChangeTitle from './useChangeTitle';
import { fetchDailyPrayerTime } from "../service.tsx";
import useCurrentTime from "../currentTimeRight/useCurrentTime.tsx";


const PrayerTimeAndClock = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const titles = useChangeTitle();
    const currentTime = useCurrentTime();

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            if (hours === 0 && minutes === 2) {
                window.location.reload();
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();
                if (response.success && response.data.length > 0) {
                    setPrayerTimes(response.data[0]); // Setze die Gebetszeiten
                } else {
                    console.error('Fehler beim Abrufen der Gebetszeiten:', response.message);
                }
            } catch (error) {
                console.error('Fehler beim Laden der Daten:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const checkCurrentPrayerTime = () => {
            if (prayerTimes) {
                const currentTime = getCurrentPrayerTime(prayerTimes);
                setCurrentPrayerTime(currentTime);
            }
        };
        checkCurrentPrayerTime();
        const intervalId = setInterval(checkCurrentPrayerTime, 60000);
        return () => clearInterval(intervalId);
    }, [prayerTimes]);


    const renderPrayerTime = (timeName: string, timeValue: string, title: string, prayerKey: string) => {
        const { containerClassName, containerStyle, textClassName, textStyle, timeClassName, timeStyle } =
            applyCurrentPrayerStyles(currentPrayerTime === prayerKey);

        return (
            <div
                className={`border-7 border-red-700 rounded-center p-4 flex items-center justify-between ${containerClassName}`}
                style={containerStyle}
            >
                <div className="flex flex-col mt-16">
                    <span className={`text-white text-9xl text-center font-bold ${textClassName}`} style={textStyle}>
                        {timeName}
                    </span>
                    <span
                        className={`text-white text-6xl text-center mt-5 min-w-800 ${textClassName}`}
                        style={textStyle}
                    >
                        {title}
                    </span>
                </div>
                <span className={`scale-y-125 text-white text-prayertime font-bold ${timeClassName}`} style={timeStyle}>
                    {timeValue}
                </span>
            </div>
        );
    };

    const defaultPrayerTimes = {
        fajr: '00:00',
        asr: '00:00',
        sunrise: '00:00',
        maghrib: '00:00',
        dhuhr: '00:00',
        isha: '00:00',
        hijriDateLong: '', // Leer, wie gewünscht
        gregorianDateShort: new Date().toLocaleDateString(), // Aktuelles Datum
    };

    const displayPrayerTimes = prayerTimes || defaultPrayerTimes;

    // Hauptrendering
    return (
        <main className="flex flex-grow justify-center w-full h-full ml-8 mr-8">
            {/* Linke Seite: Gebetszeiten */}
            <div className="flex-1 mr-4">
                <div className="h-full grid grid-cols-2 grid-rows-3 gap-4">
                    {renderPrayerTime('İmsak', displayPrayerTimes.fajr, titles.fajr, 'fajr')}
                    {renderPrayerTime('İkindi', displayPrayerTimes.asr, titles.asr, 'asr')}
                    {renderPrayerTime('Güneş', displayPrayerTimes.sunrise, titles.shuruq, 'sunrise')}
                    {renderPrayerTime('Akşam', displayPrayerTimes.maghrib, titles.maghrib, 'maghrib')}
                    {renderPrayerTime('Öğle', displayPrayerTimes.dhuhr, titles.dhuhr, 'dhuhr')}
                    {renderPrayerTime('Yatsı', displayPrayerTimes.isha, titles.ishaa, 'isha')}
                </div>
            </div>

            {/* Rechte Seite: Uhrzeit und Datum */}
            <div className="flex-1">
                <div className="flex flex-col items-center justify-center bg-transparent border-7 border-white rounded-center p-4 w-full h-full">
                    {/* Aktuelle Uhrzeit */}
                    <span className="text-white text-180xl font-bold">
                        {currentTime}
                    </span>
                    {/* Datum */}
                    <div className="text-white text-9xl mt-4 text-center font-bold">
                        <p>{displayPrayerTimes.hijriDateLong}</p>
                        <p className="mt-8">{displayPrayerTimes.gregorianDateShort}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PrayerTimeAndClock;
