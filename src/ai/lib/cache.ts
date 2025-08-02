// Simple in-memory cache for AI flows (for demo/dev only)
// For production, use Redis or a persistent cache

const cache = new Map<string, any>();

export function getCache<T>(key: string): T | undefined {
  return cache.get(key);
}

export function setCache<T>(key: string, value: T): void {
  cache.set(key, value);
}

export function makeCacheKey(flow: string, input: object): string {
  return flow + ':' + JSON.stringify(input);
}
