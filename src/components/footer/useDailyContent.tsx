import { useState, useEffect, useCallback } from "react";
import { fetchDailyContent } from "./service";
import { DailyContentApiResponse } from "./types";

import allahImage from '../../assets/ressources/ALLAH-image.png';
import muhammadImage from '../../assets/ressources/Muhammad-image.png';
import duaImage from '../../assets/ressources/dua-image.png';

const useDailyContent = () => {
    const [data, setData] = useState<DailyContentApiResponse | null>(null);
    const [index, setIndex] = useState<number>(0);

    // Daten nachladen – auch von außen nutzbar
    const loadData = useCallback(async () => {
        try {
            const response = await fetchDailyContent();
            setData(response);
        } catch (error) {
            console.error("Fehler beim Laden der Inhalte:", error);
        }
    }, []);

    // Initialer Ladevorgang
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Textwechsel alle 30 Sekunden
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    if (!data) return { text: "", image: "", reload: loadData };

    const items = [
        {
            text: `${data.data.verse} ${data.data.verseSource}`,
            image: allahImage,
        },
        {
            text: `${data.data.hadith} ${data.data.hadithSource}`,
            image: muhammadImage,
        },
        {
            text: `${data.data.pray} ${data.data.praySource}`,
            image: duaImage,
        },
    ];

    return {
        ...items[index],
        reload: loadData,
    };
};

export default useDailyContent;
