export function debounce<T extends (...args: any[]) => any>(
    func: T,
    waitMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function debounced(this: any, ...args: Parameters<T>) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, waitMs);
    };
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limitMs: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;

    return function throttled(this: any, ...args: Parameters<T>): void {
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limitMs) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, Math.max(limitMs - (Date.now() - lastRan), 0));
        }
    };
}
