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
                if (scrollAmount >= content.scrollHeight - scrollContainer.clientHeight) {
                    scrollAmount = 0;
                }
                scrollContainer.scrollTop = scrollAmount;
            }, 50);
        };

        const shouldScroll = () => {
            // Check if the content height is at least 1.5 times the container height
            return content.scrollHeight > scrollContainer.clientHeight * 1.5;
        };

        if (shouldScroll()) {
            startScrolling();
        }

        const resizeObserver = new ResizeObserver(() => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollAmount = 0;
                scrollContainer.scrollTop = 0;
            }
            if (shouldScroll()) {
                startScrolling();
            }
        });

        resizeObserver.observe(content);

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
            resizeObserver.disconnect();
        };
    }, [scrollContainerRef, contentRef]);
};
