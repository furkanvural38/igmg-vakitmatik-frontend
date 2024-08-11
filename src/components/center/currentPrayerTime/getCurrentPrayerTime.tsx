// currentPrayerTime.tsx
import { PrayerTimes } from '../types.ts';

export const getCurrentPrayerTime = (prayerTimes: PrayerTimes): string => {
    const currentTime = new Date();
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    };

    const imsakTime = formatTime(prayerTimes.fajr);
    const sunriseTime = formatTime(prayerTimes.sunrise);
    const dhuhrTime = formatTime(prayerTimes.dhuhr);
    const asrTime = formatTime(prayerTimes.asr);
    const maghribTime = formatTime(prayerTimes.maghrib);
    const ishaTime = formatTime(prayerTimes.isha);

    if (currentTime >= imsakTime && currentTime < sunriseTime) return 'fajr';
    if (currentTime >= sunriseTime && currentTime < dhuhrTime) return 'sunrise';
    if (currentTime >= dhuhrTime && currentTime < asrTime) return 'dhuhr';
    if (currentTime >= asrTime && currentTime < maghribTime) return 'asr';
    if (currentTime >= maghribTime && currentTime < ishaTime) return 'maghrib';
    return 'isha';
};
