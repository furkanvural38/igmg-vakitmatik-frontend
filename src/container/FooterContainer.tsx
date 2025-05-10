import { useEffect, useState } from 'react';
import { useAutoScroll } from '../components/footer/scrollFunction';
import useDailyContent from '../components/footer/useDailyContent';
import FooterView from './FooterView';

const FooterContainer = () => {
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const { text, image } = useDailyContent();

    useEffect(() => {
        if (text && content) {
            content.textContent = text;
        }
    }, [text, content]);

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