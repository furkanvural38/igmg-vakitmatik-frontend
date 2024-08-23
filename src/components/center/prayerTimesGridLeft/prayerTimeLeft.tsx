import { useEffect, useState } from "react";
import { getDate } from '../getDate.tsx';
import { PrayerTimes } from '../types.ts';
import useChangeTitle from './useChangeTitle.tsx';
import { getCurrentPrayerTime } from '../currentPrayerTime/getCurrentPrayerTime.tsx';
import { applyCurrentPrayerStyles } from '../helperClass/applyCurrentPrayerStyles.tsx';

const getNextPrayerTime = (currentPrayer: string, prayerTimes: PrayerTimes): string => {
    const prayerOrder: Array<keyof PrayerTimes> = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const nextPrayer = prayerOrder[(prayerOrder.indexOf(currentPrayer as keyof PrayerTimes) + 1) % prayerOrder.length];
    return prayerTimes[nextPrayer] as string;
};

const PrayerTimeLeft = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const [blink, setBlink] = useState<boolean>(false);
    const [blinkInterval, setBlinkInterval] = useState<NodeJS.Timeout | null>(null);
    const titles = useChangeTitle();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPrayerTimes = await getDate();
            setPrayerTimes(fetchedPrayerTimes);
            if (fetchedPrayerTimes) {
                const currentTime = getCurrentPrayerTime(fetchedPrayerTimes);
                setCurrentPrayerTime(currentTime);
                handleBlinking(fetchedPrayerTimes, currentTime);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            if (prayerTimes) {
                const currentTime = getCurrentPrayerTime(prayerTimes);
                setCurrentPrayerTime(currentTime);
                handleBlinking(prayerTimes, currentTime);
            }
        }, 60000);

        return () => {
            clearInterval(intervalId);
            if (blinkInterval) clearInterval(blinkInterval);
        };
    }, [prayerTimes]);

    const handleBlinking = (prayerTimes: PrayerTimes, currentPrayer: string) => {
        const nextPrayerTime = getNextPrayerTime(currentPrayer, prayerTimes);

        const currentTime = new Date();
        const nextPrayerDate = new Date();
        const [hours, minutes] = nextPrayerTime.split(':').map(Number);
        nextPrayerDate.setHours(hours);
        nextPrayerDate.setMinutes(minutes);
        nextPrayerDate.setSeconds(0);
        nextPrayerDate.setMilliseconds(0);

        const timeDifference = nextPrayerDate.getTime() - currentTime.getTime();
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (timeDifference <= fiveMinutesInMs && timeDifference > 0) {
            startBlinking();
        } else {
            stopBlinking();
        }
    };

    const startBlinking = () => {
        setBlink(true);
        if (blinkInterval) clearInterval(blinkInterval);
        const intervalId = setInterval(() => {
            setBlink(prevBlink => !prevBlink);
        }, 2000);
        setBlinkInterval(intervalId);
    };

    const stopBlinking = () => {
        setBlink(false);
        if (blinkInterval) clearInterval(blinkInterval);
    };

    if (!prayerTimes) {
        return <div>Loading...</div>;
    }

    const renderPrayerTime = (timeName: string, timeValue: string, title: string, prayerKey: string) => {
        const { containerClassName, containerStyle, textClassName, textStyle, timeClassName, timeStyle } = applyCurrentPrayerStyles(currentPrayerTime === prayerKey);

        const isBlinking = blink && currentPrayerTime === prayerKey;

        return (
            <div
                className={`border-7 rounded-2xl p-4 flex items-center justify-between ${containerClassName} ${isBlinking ? 'blink' : ''}`}
                style={isBlinking ? {} : containerStyle}
            >
                <div className="flex flex-col mt-16">
                    <span className={`text-7xl text-center font-bold ${isBlinking ? '' : textClassName}`} style={isBlinking ? {} : textStyle}>
                        {timeName}
                    </span>
                    <span className={`text-4xl text-center mt-5 font-bold ${isBlinking ? '' : textClassName}`} style={isBlinking ? {} : textStyle}>
                        {title}
                    </span>
                </div>
                <span className={`text-8xl font-bold ${isBlinking ? '' : timeClassName}`} style={isBlinking ? {} : timeStyle}>
                    {timeValue}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-4">
            {renderPrayerTime('İmsak', prayerTimes.fajr, titles.fajr, 'fajr')}
            {renderPrayerTime('İkindi', prayerTimes.asr, titles.asr, 'asr')}
            {renderPrayerTime('Güneş', prayerTimes.sunrise, titles.shuruq, 'sunrise')}
            {renderPrayerTime('Akşam', prayerTimes.maghrib, titles.maghrib, 'maghrib')}
            {renderPrayerTime('Öğle', prayerTimes.dhuhr, titles.dhuhr, 'dhuhr')}
            {renderPrayerTime('Yatsı', prayerTimes.isha, titles.ishaa, 'isha')}
        </div>
    );
};

export default PrayerTimeLeft;
