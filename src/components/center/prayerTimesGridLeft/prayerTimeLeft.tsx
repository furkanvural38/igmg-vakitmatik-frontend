import { useEffect, useState } from 'react';
import { PrayerTimes, PrayerTimesApiResponse } from '../types'; // Importiere die Typen
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime'; // Importiere die Methode
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles';
import useChangeTitle from './useChangeTitle';
import {fetchDailyPrayerTime} from "../service.tsx";

const PrayerTimeLeft = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const titles = useChangeTitle();

    // Daten laden
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
        const checkCurrentPrayerTime = () => {
            if (prayerTimes) {
                const currentTime = getCurrentPrayerTime(prayerTimes);
                console.log(currentTime + " Das ist die Zeit aktuell");
                setCurrentPrayerTime(currentTime);
            }
        };
        checkCurrentPrayerTime();
        const intervalId = setInterval(checkCurrentPrayerTime, 60000);
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
                className={`border-7 rounded-2xl p-4 flex items-center justify-between ${containerClassName}`}
                style={containerStyle}
            >
                <div className="flex flex-col mt-16">
                    <span className={`text-white text-8xl text-center font-bold ${textClassName}`} style={textStyle}>
                        {timeName}
                    </span>
                    <span
                        className={`text-white text-6xl text-center mt-5 font-bold min-w-375 ${textClassName}`}
                        style={textStyle}
                    >
                        {title}
                    </span>
                </div>
                <span className={`text-white text-16xl font-bold ${timeClassName}`} style={timeStyle}>
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
