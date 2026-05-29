// Pages in swipe order (left -> right).
export const PAGES = ['home', 'market', 'portfolio'] as const;
export type PageId = (typeof PAGES)[number];

// `progress` (the Master Shared Value) ranges over [0, PAGE_COUNT - 1].
export const PAGE_COUNT = PAGES.length; // 3

// Input range for every progress-driven interpolation: [0, 1, 2].
export const PAGE_INPUT_RANGE: number[] = PAGES.map((_, i) => i);

// Background color per page, index-aligned to PAGES.
// 0 home -> blue, 1 market -> dark gray, 2 portfolio -> green.
export const PAGE_BG_COLORS: string[] = ['#1E40AF', '#1F2937', '#047857'];

// Bottom-bar tab label interpolation endpoints.
export const TAB_LABEL_INACTIVE = 'rgba(255,255,255,0.55)';
export const TAB_LABEL_ACTIVE = '#FFFFFF';
export const TAB_SCALE_INACTIVE = 0.92;
export const TAB_SCALE_ACTIVE = 1;

// Market screen — trend colors & glass surfaces (transparent over pager background).
export const MARKET_POSITIVE = '#4ADE80';
export const MARKET_NEGATIVE = '#F87171';
export const MARKET_GLASS_BG = 'rgba(255,255,255,0.08)';
export const MARKET_GLASS_BORDER = 'rgba(255,255,255,0.1)';
export const MARKET_TEXT_SECONDARY = 'rgba(255,255,255,0.55)';
