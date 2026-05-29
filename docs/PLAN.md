# PLAN — Gesture-Driven Trading Sandbox (Cursor Execution Spec)

> **Purpose:** Build a 3-page (Feed / Market / Portfolio) Expo app where one horizontal gesture
> simultaneously slides the pages, slides a custom bottom-bar indicator, and morphs the background
> color — all driven by a single Reanimated `progress` shared value. This file is the execution
> spec: implement **one Step per Cursor session**. Step 1 is fully detailed; Steps 2–5 are outlines
> that get expanded into full detail at the start of their own session.

---

## Hard Rules (apply to every step — also enforced by `.cursor/rules/animation.mdc`)

1. Reanimated **4** on the **New Architecture** only (default-on in recent Expo SDKs).
2. `runOnJS` is **removed** in v4 → use `scheduleOnRN` from `react-native-worklets` for any UI→JS call.
3. Babel: `react-native-worklets/plugin` **must be the last** plugin. After Babel edits, restart Metro with `npx expo start -c`.
4. `GestureHandlerRootView` is a **mandatory** ancestor (wrap the expo-router `Stack`) or `GestureDetector` crashes.
5. Gesture Handler v2 builder API (`Gesture.Pan()`); **wrap every gesture in `useMemo`** or it re-attaches each render.
6. Do **not** add `'worklet';` to inline callbacks passed to `useAnimatedStyle` / `useDerivedValue` / gesture builders — Babel auto-workletizes them.
7. Never read or write `progress.value` on the JS thread **during render**. Mutate only in gesture callbacks / `onPress` / effects.
8. Keep static styles in `StyleSheet.create()`; only dynamic values go inside `useAnimatedStyle`.

---

## Master Shared Value — the single source of truth

```
progress: SharedValue<number>   // fractional page position, range [0, 2]
                                 // 0 = Feed, 1 = Market, 2 = Portfolio; 0.5 = halfway Feed→Market
```

- **Owned by** the pager screen (`app/index.tsx`). Created once with `useSharedValue(0)`; passed to children by props.
- **Writers** (all three write the *same* value — that is what keeps swipe + tap in sync):

  | Source | When | How |
  |--------|------|-----|
  | Pan gesture | dragging | `progress.value = clamp(startProgress + (-translationX / WIDTH), 0, MAX_PROGRESS)` |
  | Pan release | finger up | velocity-projected, rounded to nearest page → `progress.value = withSpring(target)` |
  | Tab tap | bar press | `progress.value = withSpring(index)` |

- **Readers** (each a pure `useAnimatedStyle` worklet on the UI thread → React performs **zero** re-renders):

  | Consumer | Derivation |
  |----------|------------|
  | Page row | `translateX = -progress.value * WIDTH` |
  | Bottom-bar indicator | `translateX = interpolate(progress.value, [0,1,2], [x0,x1,x2])` |
  | Background | `backgroundColor = interpolateColor(progress.value, [0,1,2], COLORS, 'LAB')` |

- **UI→JS notifications** (e.g. settle haptics) only via `useAnimatedReaction` with a `Math.round` *prepare* (fires once per settle, not per frame) + `scheduleOnRN`. Never `runOnJS`.

---

## Step 1 — Foundation & Master Shared Value  *(FULLY DETAILED)*

**Goal:** A runnable expo-router app whose entire background morphs smoothly blue → dark-gray → green,
driven by `progress`, with temporary debug buttons to trigger transitions. Establishes the single
source of truth before any pager or bar exists. **No pager, no bottom bar yet.**

**Files touched:** `babel.config.js`, `app/_layout.tsx`, `app/index.tsx`, `src/theme.ts` (+ generated scaffold).

### 1.1 Scaffold & install

> This repo (`~/Desktop/trader-app`) already has `docs/` and git. Scaffold the Expo app **into this
> existing directory**, not a sibling folder. Run scaffolding / `expo install` yourself in the terminal
> (interactive) — let Cursor do only the file edits in 1.2–1.5.

```bash
cd ~/Desktop/trader-app

# Scaffold the default Expo template (expo-router + TypeScript) INTO the current repo.
npx create-expo-app@latest .
# If it refuses (non-empty dir): scaffold into a temp dir and copy everything except docs/ and .git/ in.

# Collapse the starter to a single blank route (minimal app/index.tsx + app/_layout.tsx).
npm run reset-project   # removing the example is fine
# If reset-project is absent: delete app/(tabs) and create the two files from 1.3–1.4 below.

# Ensure the animation packages exist at SDK-correct versions (idempotent).
npx expo install react-native-reanimated react-native-gesture-handler react-native-worklets
```

### 1.2 `babel.config.js` (create / replace at project root)

```js
// react-native-worklets plugin is REQUIRED by Reanimated 4 and MUST be the last plugin.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-worklets/plugin'], // keep LAST
  };
};
```

> Then restart Metro with cache cleared: `npx expo start -c`.

### 1.3 `app/_layout.tsx` (replace contents)

```tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// GestureHandlerRootView is mandatory near the root — without it any
// GestureDetector (added in Step 3) crashes at runtime.
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
```

### 1.4 `src/theme.ts` (new file)

```ts
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
```

### 1.5 `app/index.tsx` (replace contents)

```tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PAGES, PAGE_BG_COLORS, PAGE_INPUT_RANGE } from '../src/theme';

export default function HomeScreen() {
  // === MASTER SHARED VALUE: the single source of truth ===
  // Fractional page position in [0, PAGE_COUNT - 1].
  // In later steps this same value also drives the page row + bottom-bar indicator.
  const progress = useSharedValue(0);

  // Background morphs continuously with `progress`. interpolateColor runs in a
  // worklet on the UI thread -> React performs ZERO re-renders during the morph.
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      PAGE_INPUT_RANGE,  // [0, 1, 2]
      PAGE_BG_COLORS,    // [blue, dark gray, green]
      'LAB',             // Oklab: perceptually uniform, smoothest morph
    ),
  }));

  return (
    <Animated.View style={[styles.fill, backgroundStyle]}>
      {/* TEMPORARY debug controls. Removed in Step 3 once Pan authors `progress`. */}
      <View style={styles.debugBar}>
        {PAGES.map((id, index) => (
          <Pressable
            key={id}
            style={styles.debugButton}
            // onPress (JS thread) only KICKS OFF a UI-thread animation by
            // assigning withTiming to the shared value — no per-frame JS work.
            onPress={() => {
              progress.value = withTiming(index, { duration: 450 });
            }}
          >
            <Text style={styles.debugLabel}>{id}</Text>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, justifyContent: 'flex-end' },
  debugBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  debugButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  debugLabel: { color: '#fff', fontWeight: '600', textTransform: 'capitalize' },
});
```

### 1.6 Verification (Step 1 passes only if ALL hold)

1. `npx expo start -c`, open iOS/Android: app boots with **no red error screen** (a missing Babel plugin would throw a Reanimated worklet error — its absence confirms config).
2. Initial screen is **solid blue** with three pill buttons: `feed`, `market`, `portfolio`.
3. Tap **market** → background smoothly animates blue → dark gray over ~450 ms (visible intermediate colors, not a hard cut).
4. Tap **portfolio** → morphs to green; **feed** → back to blue. Rapid taps mid-transition redirect fluidly (interruptible), no flicker.

### 1.7 Acceptance checklist

- [ ] `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets` installed (SDK-compatible).
- [ ] `babel.config.js` has `react-native-worklets/plugin` **last**; Metro restarted with `-c`.
- [ ] `app/_layout.tsx` wraps `Stack` in `GestureHandlerRootView` (`flex: 1`), header hidden.
- [ ] `src/theme.ts` exports `PAGES`, `PAGE_COUNT`, `MAX_PROGRESS`, `PAGE_INPUT_RANGE`, `PAGE_BG_COLORS`.
- [ ] `app/index.tsx` creates `progress = useSharedValue(0)` and binds it via `interpolateColor` + `useAnimatedStyle`.
- [ ] All 4 verification points pass on a device/simulator.

---

## Step 2 — Static pages & the translating row  *(OUTLINE — expand at session start)*

- **Goal:** Render 3 full-width placeholder screens and a horizontal row that translates with `progress`. Still driven by Step-1 debug buttons (no gestures yet).
- **New files:** `src/constants.ts` (`SCREEN_WIDTH` from `Dimensions`), `src/screens/FeedScreen.tsx`, `MarketScreen.tsx`, `PortfolioScreen.tsx` (static placeholders), `src/components/Pager.tsx` (the row).
- **Edit:** `app/index.tsx` — render `<Pager progress={progress}>` containing the 3 screens; keep debug buttons.
- **Key mechanic:** Row width = `PAGE_COUNT * WIDTH`; each child wrapped in a `width: WIDTH` view; `useAnimatedStyle` → `transform: [{ translateX: -progress.value * WIDTH }]`. Pass `progress` down as a prop typed `SharedValue<number>`.
- **Verify:** Tapping a debug button slides the row to that page **and** morphs the background, perfectly in sync. No gestures expected yet.
- **Detail-on-expand:** exact `Pager.tsx` code, child wrapper layout, prop typing.

## Step 3 — The Pan-gesture pager (core)  *(OUTLINE)*

- **Goal:** Swiping anywhere authors `progress` directly; release snaps to nearest page with momentum.
- **Edit:** `src/components/Pager.tsx` — add `Gesture.Pan` (in `useMemo`) + `GestureDetector`.
- **Key mechanic:** `onBegin` snapshot `startProgress.value = progress.value`; `onUpdate` `progress.value = clamp(startProgress + (-e.translationX / WIDTH), 0, MAX_PROGRESS)`; `onEnd` project with `e.velocityX` (`target = round(progress.value - velocityX/(WIDTH*K))`, clamped) → `progress.value = withSpring(target)`. Add a `clamp` worklet helper; `failOffsetY` so vertical scrolls (later) pass.
- **Verify:** Drag → pages + background follow the finger continuously; release → springs to nearest page; flick → advances a page. Debug buttons become optional.
- **Detail-on-expand:** exact gesture builder, velocity projection constant, spring config, clamp helper.

## Step 4 — Custom bottom bar + synced indicator  *(OUTLINE)*

- **Goal:** Custom tab bar whose indicator tracks `progress`; tapping a tab animates `progress` to that index.
- **New file:** `src/components/BottomBar.tsx`. **Edit:** `app/index.tsx` (render the bar, pass `progress`); delete temporary debug buttons.
- **Key mechanic:** Equal-width tab slots; indicator `useAnimatedStyle` → `translateX = interpolate(progress.value, [0,1,2], [slot0, slot1, slot2])`; tab `onPress` → `progress.value = withSpring(index)`. Slot centers from layout width / `PAGE_COUNT`.
- **Verify:** Indicator tracks the finger during a swipe **and** animates on tap — one source of truth, both input paths. Bar + pages + background stay locked.
- **Detail-on-expand:** bar layout, indicator sizing, icon/label set, safe-area handling.

## Step 5 — Fidelity polish  *(OUTLINE)*

- **Goal:** Production feel + accessibility.
- **Scope:** spring/velocity tuning; edge rubber-band via `withClamp`; active icon/label color/scale interpolation from `progress`; 120 fps enablement; `useReducedMotion` / `ReducedMotionConfig`; settle haptics via `useAnimatedReaction` (`Math.round` prepare) + `scheduleOnRN` (`expo-haptics`).
- **Verify:** Buttery on a physical device, zero desync, respects reduced-motion, haptic tick once per settled page.
- **Detail-on-expand:** exact tuning values, accessibility wiring, haptics integration.

---

## Hand-off Protocol (Cursor Composer 2.5)

**One Composer session = one Step.** After a Step compiles and passes its verification, `git commit` and
open a **fresh** chat for the next Step. Never carry two Steps in one thread (context dilution → drift).

**At the start of a session for Step 2–5:** first expand that Step's outline into full detail (files +
code + verification) *in this PLAN.md*, then implement it. This keeps spec and code in lockstep.

**Per-step prompt template:**

```
Implement STEP <N> from @docs/PLAN.md — nothing else.
Context files (read; modify only what the step lists):
  @src/theme.ts  @app/index.tsx  @app/_layout.tsx   (+ the step's own files)
Constraints:
- Make ONLY the surgical edits listed in Step <N>. Leave the app compiling.
- Do not refactor, rename, or touch files outside Step <N>'s file list.
- After editing, list exactly which files you changed and why.
Stop when Step <N>'s acceptance checklist is satisfiable. Do NOT start Step <N+1>.
```

- `@`-mention only the files a step reads/writes — starving the model of irrelevant context keeps it accurate.
- Do scaffolding / `expo install` yourself in the terminal; let Cursor do only file edits.
- The Hard Rules in `.cursor/rules/animation.mdc` auto-apply to every session — no need to re-paste them.
- Run each step's verification yourself and commit before the next session.

---
