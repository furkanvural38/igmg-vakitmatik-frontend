interface StyleResult {
    containerClassName: string;
    containerStyle: React.CSSProperties;
    textClassName: string;
    textStyle: React.CSSProperties;
    timeClassName: string;
    timeStyle: React.CSSProperties;
}

export const applyCurrentPrayerStyles = (isCurrent: boolean): StyleResult => {
    if (isCurrent) {
        return {
            containerClassName: 'bg-white bg-opacity-90 border-green-600',
            containerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            textClassName: 'text-green-600',
            textStyle: { color: '#008B00' },
            timeClassName: 'text-green-600',
            timeStyle: { color: '#008B00' },
        };
    }

    return {
        containerClassName: 'bg-transparent border-white',
        containerStyle: {},
        textClassName: 'text-black',
        textStyle: {},
        timeClassName: 'text-black',
        timeStyle: {},
    };
};
