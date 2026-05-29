// Pages in swipe order (left -> right).
export const PAGES = ['feed', 'market', 'portfolio'] as const;
export type PageId = (typeof PAGES)[number];

// `progress` (the Master Shared Value) ranges over [0, MAX_PROGRESS].
export const PAGE_COUNT = PAGES.length;       // 3
export const MAX_PROGRESS = PAGE_COUNT - 1;   // 2

// Input range for every progress-driven interpolation: [0, 1, 2].
export const PAGE_INPUT_RANGE: number[] = PAGES.map((_, i) => i);

// Background color per page, index-aligned to PAGES.
// 0 feed -> blue, 1 market -> dark gray, 2 portfolio -> green.
export const PAGE_BG_COLORS: string[] = ['#1E40AF', '#1F2937', '#047857'];
