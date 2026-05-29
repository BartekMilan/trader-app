import { useCallback } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MAX_PROGRESS,
  PAGE_COUNT,
  PAGES,
  PAGE_INPUT_RANGE,
  PAGER_SPRING_DAMPING,
  PAGER_SPRING_MASS,
  PAGER_SPRING_STIFFNESS,
  TAB_LABEL_ACTIVE,
  TAB_LABEL_INACTIVE,
  TAB_SCALE_ACTIVE,
  TAB_SCALE_INACTIVE,
} from '../theme';

const PAGER_SPRING_CONFIG = {
  damping: PAGER_SPRING_DAMPING,
  stiffness: PAGER_SPRING_STIFFNESS,
  mass: PAGER_SPRING_MASS,
};

const INDICATOR_INSET = 8;

type BottomBarProps = {
  progress: SharedValue<number>;
};

type TabProps = {
  id: (typeof PAGES)[number];
  index: number;
  progress: SharedValue<number>;
  onPress: () => void;
};

function Tab({ id, index, progress, onPress }: TabProps) {
  const labelStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      color: interpolateColor(focus, [0, 1], [TAB_LABEL_INACTIVE, TAB_LABEL_ACTIVE]),
      transform: [{ scale: interpolate(focus, [0, 1], [TAB_SCALE_INACTIVE, TAB_SCALE_ACTIVE]) }],
    };
  });

  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Animated.Text style={[styles.tabLabel, labelStyle]}>{id}</Animated.Text>
    </Pressable>
  );
}

export function BottomBar({ progress }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const barWidth = useSharedValue(0);

  const onBarLayout = useCallback(
    (e: LayoutChangeEvent) => {
      barWidth.value = e.nativeEvent.layout.width;
    },
    [barWidth],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    const slotWidth = barWidth.value / PAGE_COUNT;
    const indicatorWidth = slotWidth - INDICATOR_INSET * 2;

    return {
      width: indicatorWidth,
      transform: [
        {
          translateX: interpolate(
            progress.value,
            PAGE_INPUT_RANGE,
            [
              INDICATOR_INSET,
              slotWidth + INDICATOR_INSET,
              2 * slotWidth + INDICATOR_INSET,
            ],
          ),
        },
      ],
    };
  });

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.barInner} onLayout={onBarLayout}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        {PAGES.map((id, index) => (
          <Tab
            key={id}
            id={id}
            index={index}
            progress={progress}
            onPress={() => {
              progress.value = withClamp(
                { min: 0, max: MAX_PROGRESS },
                withSpring(index, PAGER_SPRING_CONFIG),
              );
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  barInner: {
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.22)',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: INDICATOR_INSET,
    bottom: INDICATOR_INSET,
    left: 0,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  tabLabel: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
