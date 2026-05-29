import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Pager } from '../components/Pager';
import { FeedScreen } from '../screens/FeedScreen';
import { MarketScreen } from '../screens/MarketScreen';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { PAGES, PAGE_BG_COLORS, PAGE_INPUT_RANGE } from '../theme';

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
      <Pager progress={progress}>
        <FeedScreen />
        <MarketScreen />
        <PortfolioScreen />
      </Pager>
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
  fill: { flex: 1 },
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
