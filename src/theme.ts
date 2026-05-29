// Pages in swipe order (left -> right).
export const PAGES = ['home', 'market', 'portfolio'] as const;
export type PageId = (typeof PAGES)[number];

// `progress` (the Master Shared Value) ranges over [0, PAGE_COUNT - 1].
export const PAGE_COUNT = PAGES.length; // 3

// Input range for every progress-driven interpolation: [0, 1, 2].
export const PAGE_INPUT_RANGE: number[] = PAGES.map((_, i) => i);

export type PageGradient = {
  colors: readonly [string, string, ...string[]];
  locations: readonly [number, number, ...number[]];
};

// Revolut-style layered gradients per page (top accent → deep base).
export const PAGE_GRADIENTS: PageGradient[] = [
  {
    colors: ['#6B8FE8', '#3D5FA8', '#1A2748', '#080C14'],
    locations: [0, 0.32, 0.68, 1],
  },
  {
    colors: ['#6B7588', '#434B5C', '#222830', '#090B10'],
    locations: [0, 0.34, 0.7, 1],
  },
  {
    colors: ['#3DD6A8', '#1A8F6A', '#0C3D2E', '#050E0A'],
    locations: [0, 0.32, 0.68, 1],
  },
];

// Bottom-bar tab label interpolation endpoints.
export const TAB_LABEL_INACTIVE = 'rgba(255,255,255,0.55)';
export const TAB_LABEL_ACTIVE = '#FFFFFF';
export const TAB_ACTIVE_PILL_FILL = 'transparent';
export const TAB_ACTIVE_PILL_BORDER = 'rgba(255,255,255,0.22)';
export const TAB_ACTIVE_PILL_SHINE_TOP = 'rgba(255,255,255,0.16)';
export const TAB_ACTIVE_PILL_SHINE_BOTTOM = 'rgba(255,255,255,0.04)';

// Market screen — trend colors & glass surfaces (transparent over pager background).
export const MARKET_POSITIVE = '#4ADE80';
export const MARKET_NEGATIVE = '#F87171';
export const MARKET_GLASS_BG = 'rgba(255,255,255,0.08)';
export const MARKET_GLASS_BORDER = 'rgba(255,255,255,0.1)';
export const MARKET_TEXT_SECONDARY = 'rgba(255,255,255,0.55)';
