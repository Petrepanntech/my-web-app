import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VirtualizedListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemHeight: number;
    windowHeight: number;
    onEndReached?: () => void;
    endReachedThreshold?: number;
    isLoading?: boolean;
}

export function VirtualizedList<T>({
    items,
    renderItem,
    itemHeight,
    windowHeight,
    onEndReached,
    endReachedThreshold = 0.8,
    isLoading = false
}: VirtualizedListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isEndReached, setIsEndReached] = useState(false);

    const visibleItemCount = Math.ceil(windowHeight / itemHeight);
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        setScrollTop(target.scrollTop);

        if (!isEndReached && onEndReached) {
            const scrolledPercentage = 
                (target.scrollTop + target.clientHeight) / target.scrollHeight;
            
            if (scrolledPercentage > endReachedThreshold) {
                setIsEndReached(true);
                onEndReached();
            }
        }
    }, [endReachedThreshold, isEndReached, onEndReached]);

    useEffect(() => {
        setIsEndReached(false);
    }, [items.length]);

    const visibleItems = items.slice(startIndex, endIndex).map((item, index) => 
        renderItem(item, startIndex + index)
    );

    const paddingTop = startIndex * itemHeight;
    const paddingBottom = (items.length - endIndex) * itemHeight;

    return (
        <div
            ref={containerRef}
            onScroll={onScroll}
            style={{ height: windowHeight, overflow: 'auto' }}
            className="relative"
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    paddingTop,
                    paddingBottom,
                }}>
                    {visibleItems}
                </div>
            </div>
            {isLoading && (
                <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            )}
        </div>
    );
}
