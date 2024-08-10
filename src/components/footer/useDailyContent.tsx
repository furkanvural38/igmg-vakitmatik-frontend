import { useState, useEffect } from "react";
import { fetchDailyContent } from "./service";
import { ApiResponse } from "./types";

const useDailyContent = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchDailyContent();
                setData(result); // Setze die gesamte API-Antwort
            } catch (error) {
                console.error('Fehler beim Laden der Daten:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % 3); // Wechselt alle 10 Sekunden
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (!data) return { text: '', image: '' }; // Falls die Daten noch nicht geladen sind

    // Erstelle die Items-Array
    const items = [
        {
            text: `${data.data.verse} ${data.data.verseSource}`,
            image: "/ressources/ALLAH-image.png"
        },
        {
            text: `${data.data.hadith} ${data.data.hadithSource}`,
            image: "/ressources/Muhammad-image.png"
        },
        {
            text: `${data.data.pray} ${data.data.praySource}`,
            image: "/ressources/dua-image.png"
        }
    ];

    // Gib das aktuelle Item basierend auf dem Index zurück
    return items[index];
};

export default useDailyContent;
