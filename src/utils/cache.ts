const CACHE_PREFIX = 'places_v2_';
const CACHE_TTL = 1000 * 60 * 60; // 1 час

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export const getCache = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const parsed: CacheEntry<T> = JSON.parse(raw);

    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
};

export const setCache = <T>(key: string, data: T): void => {
  if (Array.isArray(data) && data.length === 0) return;

  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {}
};

export const clearExpiredCache = (): void => {
  try {
    const now = Date.now();

    Object.keys(localStorage)
      .filter((k) => k.startsWith('places_'))
      .forEach((k) => {
        try {
          const parsed = JSON.parse(localStorage.getItem(k) ?? '');
          const isCurrent = k.startsWith(CACHE_PREFIX);

          if (!isCurrent || now - parsed.timestamp > CACHE_TTL) {
            localStorage.removeItem(k);
          }
        } catch {
          localStorage.removeItem(k);
        }
      });
  } catch {}
};
