import { PrayerTimesApiResponse } from "./types";
import { fetchPrayerTimesFromLocalExcel } from "../../excelReader/service.ts"; // Lokale Excel-Funktion

export const fetchDailyPrayerTimeWithFallback = async (): Promise<PrayerTimesApiResponse> => {
    try {
        const response = await fetch("https://igmg-namaz.synology.me:3838/hannover");

        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok.");
        }

        const data: PrayerTimesApiResponse = await response.json();

        if (!data.success || !data.data.length) {
            throw new Error("Unerwartete API-Antwort.");
        }

        return data;
    } catch (error) {
        console.warn("⚠️ Online-Daten nicht verfügbar. Verwende lokale Excel-Datei.");
        return fetchPrayerTimesFromLocalExcel();
    }
};