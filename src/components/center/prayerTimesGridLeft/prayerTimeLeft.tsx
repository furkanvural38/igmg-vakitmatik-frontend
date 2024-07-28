import React, { useState, useEffect } from 'react';
import { getDate } from '../getDate.tsx'; // Pfad zur getDate-Datei anpassen
import { PrayerTimes } from '../types.ts'; // Pfad zu den Typen anpassen

const PrayerTimeLeft = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

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

    return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-4">
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">İmsak</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.fajr}</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">İkindi</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.sunrise}</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Güneş</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.dhuhr}</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Akşam</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.asr}</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Öğle</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.maghrib}</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Yatsı</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">{prayerTimes.isha}</span>
            </div>
        </div>
    );
};

export default PrayerTimeLeft;

/*
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
*/