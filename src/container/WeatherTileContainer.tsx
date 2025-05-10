import { useState, useEffect } from 'react';
import WeatherTileView from './WeatherTileView';

// Datentypen definieren
interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    clouds: {
        all: number;
    };
}

const WeatherTileContainer = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());

    // API-Daten laden
    const fetchData = async () => {
        try {
            const res = await fetch(
                'https://api.openweathermap.org/data/2.5/weather?q=Hannover&units=metric&appid=6847fff1ba1440395c9624c98a44f3f0'
            );
            const json = await res.json();
            setData(json);
            setError(null);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('Unbekannter Fehler beim Laden der Wetterdaten.');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial & stündliches Laden
    useEffect(() => {
        fetchData();
        const hourly = setInterval(fetchData, 3600000); // alle 1h
        return () => clearInterval(hourly);
    }, []);

    // Tageswechsel erkennen & Daten neu laden
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().getDate();
            if (today !== currentDay) {
                setCurrentDay(today);
                fetchData();
            }
        }, 60000); // alle Minute prüfen

        return () => clearInterval(interval);
    }, [currentDay]);

    // View anzeigen
    return (
        <WeatherTileView
            data={data}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default WeatherTileContainer;
