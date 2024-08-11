import { getDate } from '../getDate.tsx'; // Pfad zur getDate-Datei anpassen
import { PrayerTimes } from '../types.ts'; // Pfad zu den Typen anpassen
import useChangeTitle from './useChangeTitle.tsx';
import { useEffect, useState } from "react"; // Pfad zur useChangeTitle-Datei anpassen
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime.tsx'; // Neue Funktion importieren

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

        fetchData();
    }, []);

    if (!prayerTimes) {
        return <div>Loading...</div>; // Zeige einen Ladeindikator an, wenn die Daten noch nicht geladen sind
    }

    const renderPrayerTime = (timeName: string, timeValue: string, title: string, prayerKey: string) => (
        <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
            <div className="flex flex-col mt-16">
                <span
                    className={`text-7xl text-center font-bold ${currentPrayerTime === prayerKey ? 'text-red-600' : 'text-black'}`}
                >
                    {timeName}
                </span>
                <span className="text-black text-4xl text-center mt-5 font-bold" style={{ minWidth: '220px' }}>{title}</span>
            </div>
            <span className="text-black text-8xl font-bold">{timeValue}</span>
        </div>
    );

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
