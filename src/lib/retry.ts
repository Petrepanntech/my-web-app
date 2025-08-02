interface RetryConfig {
    maxAttempts?: number;
    delayMs?: number;
    backoffFactor?: number;
    maxDelayMs?: number;
}

const defaultConfig: RetryConfig = {
    maxAttempts: 3,
    delayMs: 1000,
    backoffFactor: 2,
    maxDelayMs: 10000,
};

export async function withRetry<T>(
    fn: () => Promise<T>,
    config: RetryConfig = {}
): Promise<T> {
    const finalConfig = { ...defaultConfig, ...config };
    let lastError: Error | null = null;
    let delay = finalConfig.delayMs!;

    for (let attempt = 1; attempt <= finalConfig.maxAttempts!; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            
            if (attempt === finalConfig.maxAttempts!) {
                throw new Error(
                    `Failed after ${attempt} attempts. Last error: ${lastError.message}`
                );
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Exponential backoff with max delay
            delay = Math.min(
                delay * finalConfig.backoffFactor!,
                finalConfig.maxDelayMs!
            );
        }
    }

    // TypeScript requires this even though it's unreachable
    throw lastError;
}

// Utility to create a retry-enabled function
export function createRetryableFunction<T>(
    fn: () => Promise<T>,
    config?: RetryConfig
): () => Promise<T> {
    return () => withRetry(fn, config);
}
