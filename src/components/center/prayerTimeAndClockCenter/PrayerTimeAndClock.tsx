import { useEffect, useState } from 'react';
import { PrayerTimes, PrayerTimesApiResponse } from '../types'; // Importiere die Typen
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime'; // Importiere die Methode
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles';
import useChangeTitle from './useChangeTitle';
import { fetchDailyPrayerTime } from "../service.tsx";
import useCurrentTime from "../currentTimeRight/useCurrentTime.tsx";

const getNextPrayerTime = (currentPrayer: string, prayerTimes: PrayerTimes): string => {
    const prayerOrder: Array<keyof PrayerTimes> = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const nextPrayer = prayerOrder[(prayerOrder.indexOf(currentPrayer as keyof PrayerTimes) + 1) % prayerOrder.length];
    return prayerTimes[nextPrayer] as string;
};

const getNextPrayerName = (currentPrayer: string): string => {
    const prayerOrder: Array<keyof PrayerTimes> = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const nextPrayer = prayerOrder[(prayerOrder.indexOf(currentPrayer as keyof PrayerTimes) + 1) % prayerOrder.length];
    const prayerNames: { [key: string]: string } = {
        fajr: 'Fajr',
        sunrise: 'Shuruq',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha\'a',
    };
    return prayerNames[nextPrayer] || '';
};

const calculateTimeUntilNextPrayer = (currentPrayer: string, prayerTimes: PrayerTimes | null): string => {
    if (!prayerTimes) return "00:00:00"; // Keine Berechnung, wenn prayerTimes nicht gesetzt ist

    const currentTime = new Date();
    let nextPrayerTime: string;

    // Sonderfall: Wenn das aktuelle Gebet "isha" ist
    if (currentPrayer === "isha") {
        nextPrayerTime = prayerTimes.fajr;

        // Fajr auf den nächsten Tag setzen
        const nextPrayerDate = new Date(currentTime);
        nextPrayerDate.setDate(currentTime.getDate() + 1); // Nächster Tag
        const [hours, minutes] = nextPrayerTime.split(':').map(Number);
        nextPrayerDate.setHours(hours);
        nextPrayerDate.setMinutes(minutes);
        nextPrayerDate.setSeconds(0);
        nextPrayerDate.setMilliseconds(0);

        const timeDifference = nextPrayerDate.getTime() - currentTime.getTime();
        return formatTimeDifference(timeDifference);
    }

    // Standardfall: Nächste Gebetszeit innerhalb desselben Tages
    nextPrayerTime = getNextPrayerTime(currentPrayer, prayerTimes);
    const nextPrayerDate = new Date(currentTime);
    const [hours, minutes] = nextPrayerTime.split(':').map(Number);
    nextPrayerDate.setHours(hours);
    nextPrayerDate.setMinutes(minutes);
    nextPrayerDate.setSeconds(0);
    nextPrayerDate.setMilliseconds(0);

    const timeDifference = nextPrayerDate.getTime() - currentTime.getTime();
    return formatTimeDifference(timeDifference);
};

// Helferfunktion: Formatiert die Zeitdifferenz in "hh:mm:ss"
const formatTimeDifference = (timeDifference: number): string => {
    if (timeDifference <= 0) {
        return "00:00:00"; // Falls die Zeit überschritten ist
    }

    const totalSeconds = Math.floor(timeDifference / 1000);
    const hoursLeft = Math.floor(totalSeconds / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;

    return `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
        .toString()
        .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
};

const PrayerTimeAndClock = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const [leftTime, setLeftTime] = useState<string>("00:00:00");
    const [nextPrayerName, setNextPrayerName] = useState<string>(''); // Neuer Zustand für den Namen der nächsten Gebetszeit
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
                    setPrayerTimes(response.data[0]);
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
        const updateTimeUntilNextPrayer = () => {
            if (prayerTimes && currentPrayerTime) {
                const timeUntilNextPrayer = calculateTimeUntilNextPrayer(currentPrayerTime, prayerTimes);
                setLeftTime(timeUntilNextPrayer);
            }
        };

        const checkCurrentPrayerTime = () => {
            if (prayerTimes) {
                const currentTime = getCurrentPrayerTime(prayerTimes);
                setCurrentPrayerTime(currentTime);

                // Aktualisiere den Namen der nächsten Gebetszeit
                const nextPrayer = getNextPrayerName(currentTime);
                setNextPrayerName(nextPrayer);

                updateTimeUntilNextPrayer();
            }
        };

        if (prayerTimes) {
            checkCurrentPrayerTime();
            const intervalId = setInterval(checkCurrentPrayerTime, 1000);
            return () => clearInterval(intervalId);
        }
    }, [prayerTimes, currentPrayerTime]);

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

    return (
        <main className="flex flex-grow justify-center w-full h-full ml-8 mr-8">
            <div className="flex-1 mr-4">
                <div className="h-full grid grid-cols-2 grid-rows-3 gap-4">
                    {renderPrayerTime('Fajr', displayPrayerTimes.fajr, titles.fajr, 'fajr')}
                    {renderPrayerTime('Asr', displayPrayerTimes.asr, titles.asr, 'asr')}
                    {renderPrayerTime('Shuruq', displayPrayerTimes.sunrise, titles.shuruq, 'sunrise')}
                    {renderPrayerTime('Maghrib', displayPrayerTimes.maghrib, titles.maghrib, 'maghrib')}
                    {renderPrayerTime('Dhuhr', displayPrayerTimes.dhuhr, titles.dhuhr, 'dhuhr')}
                    {renderPrayerTime('Isha\'a', displayPrayerTimes.isha, titles.ishaa, 'isha')}
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-between">
                <div className="bg-transparent border-7 border-white rounded-center w-full mb-4 pb-14">
                    <div className="flex flex-col items-center">
                        <span className="text-white text-180xl font-bold">{currentTime}</span>
                        <div className="text-white text-9xl mt-4 text-center font-bold">
                            <p>{displayPrayerTimes.hijriDateLong}</p>
                            <p className="mt-8">{displayPrayerTimes.gregorianDateShort}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-transparent border-7 border-white rounded-center w-full h-full flex items-center justify-center">
                    <div className="text-white text-9xl text-center">
                        <p>Bis {nextPrayerName} verbleibt noch:</p>
                        <p className="text-12xl font-bold">{leftTime}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PrayerTimeAndClock;
