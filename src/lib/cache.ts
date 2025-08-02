import { LRUCache } from 'lru-cache';

interface CacheOptions {
    max?: number;
    ttl?: number;
}

export class AIResponseCache {
    private cache: LRUCache<string, any>;

    constructor(options: CacheOptions = {}) {
        this.cache = new LRUCache({
            max: options.max || 500, // Store up to 500 items
            ttl: options.ttl || 1000 * 60 * 30, // Cache for 30 minutes
            updateAgeOnGet: true,
            allowStale: false,
        });
    }

    async get(key: string): Promise<any | undefined> {
        return this.cache.get(key);
    }

    async set(key: string, value: any): Promise<void> {
        this.cache.set(key, value);
    }

    async has(key: string): Promise<boolean> {
        return this.cache.has(key);
    }

    async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }

    async clear(): Promise<void> {
        this.cache.clear();
    }
}

// Create a singleton instance
export const aiCache = new AIResponseCache();

// Utility function to generate cache keys
export function generateCacheKey(prompt: string, context?: any): string {
    const contextHash = context ? JSON.stringify(context) : '';
    return `ai_${prompt.toLowerCase().trim()}_${contextHash}`;
}
