import { useEffect, useState } from 'react';
import { PrayerTimes, PrayerTimesApiResponse } from '../types';
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime';
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles';
import useChangeTitle from './useChangeTitle';
import { fetchDailyPrayerTime } from "../service.tsx";
import useCurrentTime from "../currentTimeRight/useCurrentTime.tsx";

const getNextPrayerTime = (currentPrayer: string, prayerTimes: PrayerTimes): string => {
    const prayerOrder: Array<keyof PrayerTimes> = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const nextPrayer = prayerOrder[(prayerOrder.indexOf(currentPrayer as keyof PrayerTimes) + 1) % prayerOrder.length];
    return prayerTimes[nextPrayer] as string;
};

const calculateTimeUntilNextPrayer = (currentPrayer: string, prayerTimes: PrayerTimes): string => {
    const nextPrayerTime = getNextPrayerTime(currentPrayer, prayerTimes);

    const currentTime = new Date();
    const nextPrayerDate = new Date();
    const [hours, minutes] = nextPrayerTime.split(':').map(Number);
    nextPrayerDate.setHours(hours);
    nextPrayerDate.setMinutes(minutes);
    nextPrayerDate.setSeconds(0);
    nextPrayerDate.setMilliseconds(0);

    const timeDifference = nextPrayerDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
        return "00:00:00"; // Falls die Zeit überschritten ist
    }

    const totalSeconds = Math.floor(timeDifference / 1000);
    const hoursLeft = Math.floor(totalSeconds / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;

    return `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
};

const PrayerTimeAndClock = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const [calculatedPrayerTimeUntilNext, setCalculatedPrayerTimeUntilNext] = useState<string>("00:00:00");
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
                const timeUntilNextPrayer = calculateTimeUntilNextPrayer(currentTime, prayerTimes);
                setCalculatedPrayerTimeUntilNext(timeUntilNextPrayer);
            }
        };
        checkCurrentPrayerTime();
        const intervalId = setInterval(checkCurrentPrayerTime, 1000); // Aktualisiere jede Sekunde
        return () => clearInterval(intervalId);
    }, [prayerTimes]);

    if (!prayerTimes) {
        return <div>Loading...</div>;
    }

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
                <span className={`text-white text-prayertime font-bold ${timeClassName}`} style={timeStyle}>
                    {timeValue}
                </span>
            </div>
        );
    };

    // Hauptrendering
    return (
        <main className="flex flex-grow justify-center w-full h-full ml-8 mr-8">
            {/* Linke Seite: Gebetszeiten */}
            <div className="flex-1 mr-4">
                <div className="h-full grid grid-cols-2 grid-rows-3 gap-4">
                    {renderPrayerTime('İmsak', prayerTimes.fajr, titles.fajr, 'fajr')}
                    {renderPrayerTime('İkindi', prayerTimes.asr, titles.asr, 'asr')}
                    {renderPrayerTime('Güneş', prayerTimes.sunrise, titles.shuruq, 'sunrise')}
                    {renderPrayerTime('Akşam', prayerTimes.maghrib, titles.maghrib, 'maghrib')}
                    {renderPrayerTime('Öğle', prayerTimes.dhuhr, titles.dhuhr, 'dhuhr')}
                    {renderPrayerTime('Yatsı', prayerTimes.isha, titles.ishaa, 'isha')}
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
                    <div className="text-white text-9xl mt-4 text-center">
                        <p>{prayerTimes.hijriDateLong}</p>
                        <p className="mt-8">{prayerTimes.gregorianDateShort}</p>
                        <p className="mt-8">
                            {"Vaktinin çikmasına: "}
                            <span className="font-bold">{calculatedPrayerTimeUntilNext}</span>
                            {" kaldı"}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PrayerTimeAndClock;
