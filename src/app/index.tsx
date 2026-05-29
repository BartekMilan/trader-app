import * as Haptics from "expo-haptics";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { BottomBar } from "../components/BottomBar";
import { PageBackground } from "../components/PageBackground";
import { Pager } from "../components/Pager";
import { SCREEN_WIDTH } from "../constants";
import { HomeScreen as HomeTabScreen } from "../screens/HomeScreen";
import { MarketScreen } from "../screens/MarketScreen";
import { PortfolioScreen } from "../screens/PortfolioScreen";

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

  return (
    <Animated.View style={styles.fill}>
      <PageBackground progress={progress} />
      <Pager ref={pagerRef} progress={progress}>
        <HomeTabScreen />
        <MarketScreen />
        <PortfolioScreen />
      </Pager>
      <BottomBar progress={progress} onTabPress={handleTabPress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Fallback base if a child view is still opaque; matches home gradient bottom stop.
  fill: { flex: 1, backgroundColor: "#080C14" },
});
