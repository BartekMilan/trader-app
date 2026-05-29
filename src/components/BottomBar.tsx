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
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon } from './home/HomeIcon';
import {
  PAGE_COUNT,
  PAGES,
  PAGE_INPUT_RANGE,
  TAB_LABEL_ACTIVE,
  TAB_LABEL_INACTIVE,
  TAB_SCALE_ACTIVE,
  TAB_SCALE_INACTIVE,
} from '../theme';

const INDICATOR_INSET = 8;

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
  const labelStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      color: interpolateColor(focus, [0, 1], [TAB_LABEL_INACTIVE, TAB_LABEL_ACTIVE]),
      transform: [{ scale: interpolate(focus, [0, 1], [TAB_SCALE_INACTIVE, TAB_SCALE_ACTIVE]) }],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const focus = 1 - Math.min(1, Math.abs(progress.value - index));

    return {
      opacity: interpolate(focus, [0, 1], [0.55, 1]),
      transform: [{ scale: interpolate(focus, [0, 1], [TAB_SCALE_INACTIVE, TAB_SCALE_ACTIVE]) }],
    };
  });

  return (
    <Pressable style={styles.tab} onPress={onPress}>
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
            onPress={() => onTabPress(index)}
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
    paddingVertical: 10,
    gap: 4,
  },
  tabIconWrap: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
