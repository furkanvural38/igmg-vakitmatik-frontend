// getDate.tsx
import { fetchDailyPrayerTime } from '../service.tsx';
import { PrayerTimesApiResponse } from '../types.ts';

export const getDate = async () => {
    try {
        const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();

        if (response.success && response.data.length > 0) {
            const { gregorianDateLong, hijriDateLong } = response.data[0];
            const miladiDate = gregorianDateLong;
            const hicriDate = hijriDateLong;
            return { hicriDate, miladiDate };
        } else {
            throw new Error('Ungültige API-Antwort');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return { hicriDate: '', miladiDate: '' }; // Standardwerte bei Fehler
    }
};
