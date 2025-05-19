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
        let scrollInterval: number | null = null;
        let pauseTimeout: number | null = null;

        const startScrolling = () => {
            scrollInterval = window.setInterval(() => {
                scrollAmount += 1;
                if (scrollAmount >= content.scrollHeight - scrollContainer.clientHeight) {
                    if (scrollInterval) clearInterval(scrollInterval); // Stop scrolling
                    pauseTimeout = window.setTimeout(() => {
                        scrollAmount = 0; // Reset scroll amount after the pause
                        scrollContainer.scrollTop = scrollAmount;
                        startScrolling(); // Restart scrolling after the pause
                    }, 500); // 0.5 second pause
                } else {
                    scrollContainer.scrollTop = scrollAmount;
                }
            }, 50);
        };

        const shouldScroll = () => {
            // Check if the content height is at least 1.5 times the container height
            return content.scrollHeight > scrollContainer.clientHeight * 1.15;
        };

        if (shouldScroll()) {
            startScrolling();
        }
        const resizeObserver = new ResizeObserver(() => {
            if (scrollInterval) clearInterval(scrollInterval);
            if (pauseTimeout) clearTimeout(pauseTimeout);
            scrollAmount = 0;
            scrollContainer.scrollTop = 0;
            if (shouldScroll()) {
                startScrolling();
            }
        });

        resizeObserver.observe(content);

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
            if (pauseTimeout) clearTimeout(pauseTimeout);
            resizeObserver.disconnect();
        };
    }, [scrollContainerRef, contentRef]);
};
