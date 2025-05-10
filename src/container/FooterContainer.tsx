import { useEffect, useState } from 'react';
import { useAutoScroll } from '../components/footer/scrollFunction';
import useDailyContent from '../components/footer/useDailyContent';
import FooterView from './FooterView';

const FooterContainer = () => {
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const { text, image, reload } = useDailyContent(); // ⬅️ reload nutzen
    const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());

    // Tageswechsel erkennen und Inhalte neu laden
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().getDate();

            if (today !== currentDay) {
                setCurrentDay(today);
                reload(); // ✅ nur Inhalte neu laden, kein Reload
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [currentDay, reload]);

    // Textinhalt nachladen
    useEffect(() => {
        if (text && content) {
            content.textContent = text;
        }
    }, [text, content]);

    // Automatischer Scroll
    useAutoScroll({ current: scrollContainer }, { current: content });

    return (
        <FooterView
            image={image}
            text={text}
            handleScrollContainerRef={setScrollContainer}
            handleContentRef={setContent}
        />
    );
};

export default FooterContainer;
