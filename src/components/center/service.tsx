import { PrayerTimesApiResponse } from "./types";
import { fetchPrayerTimesFromLocalExcel } from "../../excelReader/service.ts"; // Lokale Excel-Funktion

export const fetchDailyPrayerTimeWithFallback = async (): Promise<PrayerTimesApiResponse> => {
    return fetchPrayerTimesFromLocalExcel();
};