import React, { useState, useEffect } from "react";
import WeatherTileView from "./WeatherTileView";

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

const WeatherTileContainer: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=Hannover&units=metric&appid=6847fff1ba1440395c9624c98a44f3f0"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, 3600000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <WeatherTileView
            data={weatherData}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default WeatherTileContainer;
