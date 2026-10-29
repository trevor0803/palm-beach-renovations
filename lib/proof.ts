// Deterministic "start somewhere different per page" helpers, so repeated templates
// (20 city pages) do not all show the same photos and reviews.
export function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function rotate<T>(list: T[], seed: number, n: number): T[] {
  if (list.length === 0) return [];
  const start = seed % list.length;
  return Array.from({ length: Math.min(n, list.length) }, (_, i) => list[(start + i) % list.length]);
}
