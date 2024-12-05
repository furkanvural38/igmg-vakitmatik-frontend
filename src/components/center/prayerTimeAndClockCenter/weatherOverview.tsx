import React, { useState, useEffect } from "react";

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

const WeatherTile: React.FC = () => {
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
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchWeatherData();

        // Set interval to update weather every hour
        const intervalId = setInterval(fetchWeatherData, 3600000); // 3600000ms = 1 hour

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-400 w-400 bg-gray-800 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-400 w-400 bg-gray-800 text-white">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="flex justify-center items-center h-400 w-400 bg-gray-800 text-white">
                <p>No data available.</p>
            </div>
        );
    }

    const { name, main, weather } = weatherData;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div
            className="flex flex-col items-center justify-center w-box h-box gradient-bg text-white shadow-md mr-10 rounded-3xl"
            style={{ width: "32rem", height: "34rem" }}
        >
            <h2 className="text-8xl font-bold">{name}</h2>
            <img src={weatherIcon} alt="Weather Icon" className="w-64 h-64" />
            <div className="">
                {/* Format temperature to show only the whole number */}
                <p className="text-9xl">{Math.round(main.temp)}°C</p>
            </div>
        </div>
    );
};

export default WeatherTile;
