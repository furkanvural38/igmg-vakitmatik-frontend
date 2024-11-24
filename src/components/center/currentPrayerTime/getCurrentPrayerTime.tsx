// currentPrayerTime.tsx
import { PrayerTimes } from '../types.ts';

export const getCurrentPrayerTime = (prayerTimes: PrayerTimes): string => {
    const currentTime = new Date();

    const formatTime = (time: string): Date => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0); // Stunden, Minuten, Sekunden und Millisekunden setzen
        return date;
    };

    // Gebetszeiten in ein Array umwandeln
    const prayerIntervals = [
        { start: formatTime(prayerTimes.isha), end: formatTime(prayerTimes.fajr), name: 'isha', crossesMidnight: true },
        { start: formatTime(prayerTimes.fajr), end: formatTime(prayerTimes.sunrise), name: 'fajr' },
        { start: formatTime(prayerTimes.sunrise), end: formatTime(prayerTimes.dhuhr), name: 'sunrise' },
        { start: formatTime(prayerTimes.dhuhr), end: formatTime(prayerTimes.asr), name: 'dhuhr' },
        { start: formatTime(prayerTimes.asr), end: formatTime(prayerTimes.maghrib), name: 'asr' },
        { start: formatTime(prayerTimes.maghrib), end: formatTime(prayerTimes.isha), name: 'maghrib' },
    ];

    // Überprüfung, welche Zeit aktuell ist
    for (const interval of prayerIntervals) {
        if (interval.crossesMidnight) {
            if (currentTime >= interval.start || currentTime < interval.end) {
                return interval.name;
            }
        } else if (currentTime >= interval.start && currentTime < interval.end) {
            return interval.name;
        }
    }

    // Fallback
    return 'isha';
};