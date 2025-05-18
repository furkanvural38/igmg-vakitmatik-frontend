import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchDailyPrayerTimeWithFallback } from "../src/components/center/service";

// ❗️ NICHTS mocken außer fetch
beforeEach(() => {
    vi.resetAllMocks();
});

describe("fetchDailyPrayerTimeWithFallback – Integration mit echter Excel", () => {
    it("fällt auf Excel-Fallback zurück, wenn API nicht erreichbar ist", async () => {
        // Simuliere fehlschlagenden API-Fetch
        global.fetch = vi.fn(() =>
            Promise.reject(new Error("API nicht erreichbar"))
        ) as unknown as typeof fetch;

        // 👉 Jetzt wird automatisch fetchPrayerTimesFromLocalExcel() ausgeführt
        const result = await fetchDailyPrayerTimeWithFallback();

        // ✅ Konsole zur Kontrolle
        console.log("🕌 Gebetszeiten aus echter Excel:", result.data[0]);

        // ✅ Assertions
        expect(result.success).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0].fajr).toMatch(/\d{2}:\d{2}/); // z. B. 06:11

        // Optional: überprüfe, ob heutiges Datum enthalten ist
        const today = new Date();
        const formatter = new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        const todayString = formatter.format(today);

        expect(
            result.data[0].gregorianDateLong ?? todayString
        ).toContain(todayString);
    });
});
