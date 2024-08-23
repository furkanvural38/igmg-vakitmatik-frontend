// currentPrayerTime.tsx
import { PrayerTimes } from '../types.ts';

export const getCurrentPrayerTime = (prayerTimes: PrayerTimes): string => {
    const currentTime = new Date();

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0); // Millisekunden auf 0 setzen für genaueren Vergleich
        return date;
    };

    const imsakTime = formatTime(prayerTimes.fajr);
    const sunriseTime = formatTime(prayerTimes.sunrise);
    const dhuhrTime = formatTime(prayerTimes.dhuhr);
    const asrTime = formatTime(prayerTimes.asr);
    const maghribTime = formatTime(prayerTimes.maghrib);
    const ishaTime = formatTime(prayerTimes.isha);

    // Vergleich der aktuellen Zeit mit den Gebetszeiten
    if (currentTime >= ishaTime || currentTime < imsakTime) {
        return 'isha';
    } else if (currentTime >= imsakTime && currentTime < sunriseTime) {
        return 'fajr';
    } else if (currentTime >= sunriseTime && currentTime < dhuhrTime) {
        return 'sunrise';
    } else if (currentTime >= dhuhrTime && currentTime < asrTime) {
        return 'dhuhr';
    } else if (currentTime >= asrTime && currentTime < maghribTime) {
        return 'asr';
    } else if (currentTime >= maghribTime && currentTime < ishaTime) {
        return 'maghrib';
    }

    return 'isha'; // Standardfall für den Fall, dass keine der Bedingungen zutrifft
};
