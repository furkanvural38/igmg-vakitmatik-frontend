import React from "react";

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

interface WeatherTileViewProps {
    data: WeatherData | null;
    isLoading: boolean;
    error: string | null;
}

const WeatherTileView: React.FC<WeatherTileViewProps> = ({ data, isLoading, error }) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="text-center text-white">
                <p>{""}</p>
            </div>
        );
    }

    if (!data) {
        return <p>No weather data available.</p>;
    }

    const { name, main, weather } = data;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div
            className="flex flex-col items-center justify-center w-box h-box gradient-bg text-white shadow-md mr-2 rounded-3xl mb-28"
            style={{ width: "32rem", height: "34rem" }}
        >
            <h2 className="text-8xl font-semibold">{name}</h2>
            <img src={weatherIcon} alt="Weather Icon" className="w-64 h-64" />
            <p className="text-9xl">{Math.round(main.temp)}°C</p>
        </div>
    );
};

export default WeatherTileView;
