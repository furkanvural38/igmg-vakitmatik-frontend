import { MutableRefObject, useEffect } from "react";

export const useAutoScroll = (
    scrollContainerRef: MutableRefObject<HTMLDivElement | null>,
    contentRef: MutableRefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const content = contentRef.current;

        if (!scrollContainer || !content) return;

        let scrollAmount = 0;
        let scrollInterval: NodeJS.Timeout | null = null;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                scrollAmount += 1;
                if (scrollAmount >= content.scrollHeight) {
                    scrollAmount = 0;
                }
                scrollContainer.scrollTop = scrollAmount;
            }, 50);
        };

        if (content.scrollHeight > scrollContainer.clientHeight) {
            startScrolling();
        }

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
        };
    }, [scrollContainerRef, contentRef]);
};
