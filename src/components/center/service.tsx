// service.tsx
/*
import { PrayerTimesApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyPrayerTime = async (): Promise<PrayerTimesApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/getPrayerTime');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data: PrayerTimesApiResponse = await response.json().then();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error;
    }
};


 */

import { PrayerTimesApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyPrayerTime = async (): Promise<PrayerTimesApiResponse> => {
    try {
        // Beispiel-Daten
        const data: PrayerTimesApiResponse = {
            data: [
                {
                    shapeMoonUrl: "https://awqatsalah.diyanet.gov.tr/images/d7.gif",
                    fajr: "03:47",
                    sunrise: "05:27",
                    dhuhr: "13:33",
                    asr: "17:46",
                    maghrib: "21:50",
                    isha: "22:57",
                    astronomicalSunset: "21:21",
                    astronomicalSunrise: "05:34",
                    hijriDateShort: "21.1.1446",
                    hijriDateShortIso8601: null,
                    hijriDateLong: "21 Muharrem 1446",
                    hijriDateLongIso8601: null,
                    qiblaTime: "11:22",
                    gregorianDateShort: "27.07.2024",
                    gregorianDateShortIso8601: "27.07.2024",
                    gregorianDateLong: "27 Temmuz 2024 Cumartesi",
                    gregorianDateLongIso8601: "2024-07-27T00:00:00.0000000+03:00",
                    greenwichMeanTimeZone: 2
                }
            ],
            success: true,
            message: null
        };

        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error; // Optional: Du kannst eine spezifischere Fehlerbehandlung hinzufügen
    }
};

