import React, { useState, useEffect } from 'react';
import { getDate } from '../getDate.tsx'; // Pfad zur getDate-Datei anpassen
import { PrayerTimes } from '../types.ts'; // Pfad zu den Typen anpassen
import useChangeTitle from './useChangeTitle.tsx'; // Pfad zur useChangeTitle-Datei anpassen

const PrayerTimeLeft = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const titles = useChangeTitle();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPrayerTimes: PrayerTimes | null = await getDate();
            setPrayerTimes(fetchedPrayerTimes);
        };

        fetchData();
    }, []);

    if (!prayerTimes) {
        return <div>Loading...</div>; // Zeige einen Ladeindikator an, wenn die Daten noch nicht geladen sind
    }

    const renderPrayerTime = (timeName: string, timeValue: string, title: string) => (
        <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
            <div className="flex flex-col mt-16">
                <span className="text-black text-7xl text-center font-bold">{timeName}</span>
                <span className="text-black text-4xl text-center mt-5 font-bold" style={{ minWidth: '220px' }}>{title}</span>
            </div>
            <span className="text-black text-8xl font-bold">{timeValue}</span>
        </div>
    );

    return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-4">
            {renderPrayerTime('İmsak', prayerTimes.fajr, titles.fajr)}
            {renderPrayerTime('İkindi', prayerTimes.asr, titles.asr)}
            {renderPrayerTime('Güneş', prayerTimes.sunrise, titles.shuruq)}
            {renderPrayerTime('Akşam', prayerTimes.maghrib, titles.maghrib)}
            {renderPrayerTime('Öğle', prayerTimes.dhuhr, titles.dhuhr)}
            {renderPrayerTime('Yatsı', prayerTimes.isha, titles.ishaa)}
        </div>
    );
};

export default PrayerTimeLeft;
