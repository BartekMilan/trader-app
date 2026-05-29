import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  PAGES,
  TAB_ACTIVE_PILL_BORDER,
  TAB_ACTIVE_PILL_FILL,
  TAB_ACTIVE_PILL_SHINE_BOTTOM,
  TAB_ACTIVE_PILL_SHINE_TOP,
  TAB_LABEL_ACTIVE,
  TAB_LABEL_INACTIVE,
} from '../theme';
import { HomeIcon } from './home/HomeIcon';

export const BOTTOM_BAR_CONTENT_HEIGHT = 58;

type BottomBarProps = {
  progress: SharedValue<number>;
  onTabPress: (index: number) => void;
};

type TabProps = {
  id: (typeof PAGES)[number];
  index: number;
  progress: SharedValue<number>;
  onPress: () => void;
};

function Tab({ id, index, progress, onPress }: TabProps) {
  const pillStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      opacity: interpolate(focus, [0, 0.4, 1], [0, 0, 1]),
      transform: [{ scale: interpolate(focus, [0, 1], [0.92, 1]) }],
      borderColor: interpolateColor(
        focus,
        [0, 1],
        ['rgba(255,255,255,0)', TAB_ACTIVE_PILL_BORDER],
      ),
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      color: interpolateColor(focus, [0, 1], [TAB_LABEL_INACTIVE, TAB_LABEL_ACTIVE]),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      opacity: interpolate(focus, [0, 1], [0.55, 1]),
    };
  });

  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Animated.View style={[styles.activePill, pillStyle]}>
        <LinearGradient
          colors={[TAB_ACTIVE_PILL_SHINE_TOP, TAB_ACTIVE_PILL_SHINE_BOTTOM]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {id === 'home' ? (
        <Animated.View style={[styles.tabIconWrap, iconStyle]}>
          <HomeIcon />
        </Animated.View>
      ) : null}
      <Animated.Text style={[styles.tabLabel, labelStyle]}>{id}</Animated.Text>
    </Pressable>
  );
}

export function BottomBar({ progress, onTabPress }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  const handleTabPress = useCallback(
    (index: number) => {
      onTabPress(index);
    },
    [onTabPress],
  );

  return (
    <View style={[styles.bar, { paddingBottom: bottomInset }]}>
      <BlurView
        intensity={Platform.OS === 'ios' ? 48 : 72}
        tint="dark"
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={styles.tintOverlay} />
      <View pointerEvents="none" style={styles.topEdge} />
      <View style={styles.barInner}>
        {PAGES.map((id, index) => (
          <Tab
            key={id}
            id={id}
            index={index}
            progress={progress}
            onPress={() => handleTabPress(index)}
          />
        ))}
      </View>
    </View>
  );
}

export function getBottomBarPadding(bottomInset: number) {
  return BOTTOM_BAR_CONTENT_HEIGHT + Math.max(bottomInset, 8);
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 6,
    overflow: 'hidden',
    zIndex: 10,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 15, 28, 0.52)',
  },
  topEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  barInner: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 3,
  },
  activePill: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 10,
    right: 10,
    borderRadius: 999,
    backgroundColor: TAB_ACTIVE_PILL_FILL,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: TAB_ACTIVE_PILL_BORDER,
    overflow: 'hidden',
  },
  tabIconWrap: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
