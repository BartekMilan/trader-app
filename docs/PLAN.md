# MIGRATION PLAN — Custom Pan Pager → Paging ScrollView

## The one conceptual shift (read this first)

Today progress is **authored**: the Pan gesture writes it, and tab taps write it. After this migration, the native scroll offset becomes the **authored** source of truth, and progress becomes a **derived mirror** of it:

**BEFORE:** Pan.onUpdate → `progress.value = ...` (you author)  
tab onPress → `progress.value = withSpring` (you author)

**AFTER:** ScrollView scroll → `progress.value = offsetX / WIDTH` (you derive)  
tab onPress → `scrollView.scrollTo({ x })` (you command; native authors)

What does **NOT** change: `progress` stays a `SharedValue<number>` in `[0, 2]`, still created in `index.tsx`, still the single value every consumer reads. So the background morph, the bottom-bar indicator, the tab-label interpolation, and the settle-haptics `useAnimatedReaction` are untouched — they keep reading `progress` exactly as before. That's the payoff of the decoupling you already have.

What you gain for free (delete-able code): velocity projection, `withSpring` snap, `withClamp`, the rubber-band worklets — all replaced by native `pagingEnabled` + `bounces`.

## Hard rules (reaffirm — your `.cursor/rules/animation.mdc` already enforces these)

- Reanimated 4 + New Arch. No `runOnJS`; `scheduleOnRN` only.
- `useAnimatedScrollHandler` callback is auto-workletized — do not add `'worklet';`.
- Keep `GestureHandlerRootView` in `_layout.tsx`. It is still required — the Market index carousel uses an RNGH ScrollView.
- Make only the edits listed per step. Leave the app compiling after each step.

---

## STEP 1 — Swap the pager engine (atomic; these 3 files must change together)

**Files:** `src/components/Pager.tsx`, `src/app/index.tsx`, `src/components/BottomBar.tsx`

### 1a. `src/components/Pager.tsx` — full rewrite

Replace the entire file. Gesture/Pan/rubber-band/spring logic is gone; a paging `Animated.ScrollView` writes `progress` from its offset, and the ScrollView ref is forwarded so the parent can command tab-tap scrolls.

```tsx
import { Children, forwardRef, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../constants';

type PagerProps = {
  progress: SharedValue<number>;
  children: ReactNode;
};

// Native paging ScrollView. The scroll offset is the authored source of truth;
// `progress` mirrors it on the UI thread so every consumer stays in sync with
// zero React re-renders. Tab taps drive it via the forwarded ref (.scrollTo).
export const Pager = forwardRef<Animated.ScrollView, PagerProps>(
  function Pager({ progress, children }, ref) {
    const pages = Children.toArray(children);

    // Single-function form == onScroll. Auto-workletized (no 'worklet';).
    const scrollHandler = useAnimatedScrollHandler((e) => {
      progress.value = e.contentOffset.x / SCREEN_WIDTH;
    });

    return (
      <Animated.ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={styles.container}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {page}
          </View>
        ))}
      </Animated.ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  // width per page = screen width so pagingEnabled snaps one page per swipe.
  // Pages stretch to full height via the ScrollView content's default cross-axis stretch.
  page: { width: SCREEN_WIDTH },
});
```

### 1b. `src/app/index.tsx` — wire the ref + tab-tap handler

Keep `progress`, the background `useAnimatedStyle`, and the haptics `useAnimatedReaction` exactly as they are. Only add the ref and the tab-press callback, and pass them down.

- Add imports: `useCallback`, `useRef` from `react`; `SCREEN_WIDTH` from `../constants`.
- Add inside the component:

```tsx
const pagerRef = useRef<Animated.ScrollView>(null);

// Tab tap commands a native animated scroll; progress updates from the scroll
// offset. Native scroll-snap curve (you confirmed this is acceptable).
const handleTabPress = useCallback((index: number) => {
  pagerRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
}, []);
```

- Update the JSX:

```tsx
<Pager ref={pagerRef} progress={progress}>
  <FeedScreen />
  <MarketScreen />
  <PortfolioScreen />
</Pager>
<BottomBar progress={progress} onTabPress={handleTabPress} />
```

### 1c. `src/components/BottomBar.tsx` — tab tap commands scroll instead of authoring progress

- Add `onTabPress: (index: number) => void` to `BottomBarProps`; thread it to the tab map.
- Change the tab `onPress` from writing `progress.value = withClamp(... withSpring ...)` to: `onPress={() => onTabPress(index)}`.
- Remove now-unused imports: `withClamp`, `withSpring`, and from `../theme` drop `MAX_PROGRESS`, `PAGER_SPRING_DAMPING`, `PAGER_SPRING_STIFFNESS`, `PAGER_SPRING_MASS`; delete the local `PAGER_SPRING_CONFIG` const.
- Keep the indicator `useAnimatedStyle`, the Tab label interpolation, `PAGE_INPUT_RANGE`, `PAGE_COUNT`, `PAGES`, `TAB_*` — all unchanged (they read `progress`).

### Step 1 acceptance checklist

- [ ] App compiles; no red screen on `npx expo start -c`.
- [ ] Swiping anywhere slides pages and morphs the background continuously with the finger.
- [ ] Releasing a swipe snaps to the nearest page (native paging); edges rubber-band (native bounces).
- [ ] Tapping a tab smoothly scrolls to that page; indicator + labels track it.
- [ ] Settle haptic still fires once per page change.
- [ ] No `runOnJS`; no `'worklet';` added to the scroll handler.

---

## STEP 2 — Cleanup + nested-scroll verification

**Files:** `src/theme.ts` (+ verify, no edit, `src/components/market/IndexCardsCarousel.tsx`)

### 2a. `src/theme.ts` — delete dead custom-pan constants

Remove (now referenced nowhere): `VELOCITY_PROJECTION_K`, `PAGER_SPRING_DAMPING`, `PAGER_SPRING_STIFFNESS`, `PAGER_SPRING_MASS`, `RUBBER_BAND_RESISTANCE`, `RUBBER_BAND_MAX_OVERSCROLL`, and `MAX_PROGRESS` (was only used by the old snap/clamp logic). Keep `PAGES`, `PAGE_COUNT`, `PAGE_INPUT_RANGE`, `PAGE_BG_COLORS`, `TAB_*`, `MARKET_*`. Run `expo lint`/`tsc` to confirm no dangling imports.

### 2b. Verify nested horizontal scroll (the one real risk)

MarketScreen's IndexCardsCarousel is a horizontal RNGH ScrollView now living inside a horizontal native paging ScrollView. Verify on a device:

- [ ] Dragging on the index carousel scrolls the carousel — it does not flip the page.
- [ ] Dragging elsewhere on the Market page still changes pages.

If they conflict (carousel hijacks page swipe or vice versa), the robust fix is to unify gesture arbitration by making the outer pager an RNGH ScrollView too — both then negotiate through gesture-handler. Apply only if needed:

```tsx
// Pager.tsx fallback: animated RNGH ScrollView instead of Animated.ScrollView
import { ScrollView as GHScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
const AnimatedGHScrollView = Animated.createAnimatedComponent(GHScrollView);
// ...use <AnimatedGHScrollView .../> with the same props; ref type becomes GHScrollView.
```

(Vertical scrollers inside screens are orthogonal and won't conflict — no action needed.)

### Step 2 acceptance checklist

- [ ] `expo lint` / `tsc` clean; no unused-import or missing-export errors.
- [ ] Market carousel and page swipe coexist correctly.
- [ ] App still behaves identically to end of Step 1.

---

## Per-step Cursor prompt (one fresh Composer session per step)
