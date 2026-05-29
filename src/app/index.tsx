import * as Haptics from "expo-haptics";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { BottomBar } from "../components/BottomBar";
import { Pager } from "../components/Pager";
import { SCREEN_WIDTH } from "../constants";
import { FeedScreen } from "../screens/FeedScreen";
import { MarketScreen } from "../screens/MarketScreen";
import { PortfolioScreen } from "../screens/PortfolioScreen";
import { PAGE_BG_COLORS, PAGE_INPUT_RANGE } from "../theme";

function triggerSettleHaptic() {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export default function HomeScreen() {
  // === MASTER SHARED VALUE: the single source of truth ===
  // Fractional page position in [0, PAGE_COUNT - 1].
  // Drives the page row, bottom-bar indicator, and background morph.
  const progress = useSharedValue(0);
  const pagerRef = useRef<Animated.ScrollView>(null);

  // Tab tap commands a native animated scroll; progress updates from the scroll
  // offset. Native scroll-snap curve (you confirmed this is acceptable).
  const handleTabPress = useCallback((index: number) => {
    pagerRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
  }, []);

  useAnimatedReaction(
    () => Math.round(progress.value),
    (current, previous) => {
      if (previous !== null && current !== previous) {
        scheduleOnRN(triggerSettleHaptic);
      }
    },
  );

  // Background morphs continuously with `progress`. interpolateColor runs in a
  // worklet on the UI thread -> React performs ZERO re-renders during the morph.
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      PAGE_INPUT_RANGE, // [0, 1, 2]
      PAGE_BG_COLORS, // [blue, dark gray, green]
      "LAB", // Oklab: perceptually uniform, smoothest morph
    ),
  }));

  return (
    <Animated.View style={[styles.fill, backgroundStyle]}>
      <Pager ref={pagerRef} progress={progress}>
        <FeedScreen />
        <MarketScreen />
        <PortfolioScreen />
      </Pager>
      <BottomBar progress={progress} onTabPress={handleTabPress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
