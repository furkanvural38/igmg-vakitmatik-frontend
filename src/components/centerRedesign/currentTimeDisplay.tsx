import React from "react";

interface CurrentTimeDisplayProps {
    hours: string;
    minutes: string;
    seconds: string;
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ hours, minutes, seconds }) => {
    return (
        <div>
            <span className="text-white font-bebas text-clock">{hours}</span>
            <span className="text-white font-bebas text-clock">:</span>
            <span className="text-white font-bebas text-clock">{minutes}</span>
            <span className="text-white font-bebas text-seconds ml-2">{seconds}</span>
        </div>
    );
};

export default CurrentTimeDisplay;
