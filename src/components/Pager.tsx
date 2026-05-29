import { Children, ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withSpring,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../constants';
import {
  MAX_PROGRESS,
  PAGE_COUNT,
  PAGER_SPRING_DAMPING,
  PAGER_SPRING_MASS,
  PAGER_SPRING_STIFFNESS,
  RUBBER_BAND_MAX_OVERSCROLL,
  RUBBER_BAND_RESISTANCE,
  VELOCITY_PROJECTION_K,
} from '../theme';

const PAGER_SPRING_CONFIG = {
  damping: PAGER_SPRING_DAMPING,
  stiffness: PAGER_SPRING_STIFFNESS,
  mass: PAGER_SPRING_MASS,
};

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

function applyRubberBand(value: number, min: number, max: number) {
  'worklet';
  if (value >= min && value <= max) {
    return value;
  }
  if (value < min) {
    const overscroll = min - value;
    return min - Math.min(overscroll * RUBBER_BAND_RESISTANCE, RUBBER_BAND_MAX_OVERSCROLL);
  }
  const overscroll = value - max;
  return max + Math.min(overscroll * RUBBER_BAND_RESISTANCE, RUBBER_BAND_MAX_OVERSCROLL);
}

type PagerProps = {
  progress: SharedValue<number>;
  children: ReactNode;
};

export function Pager({ progress, children }: PagerProps) {
  const pages = Children.toArray(children);
  const startProgress = useSharedValue(0);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .failOffsetY([-10, 10])
        .onBegin(() => {
          startProgress.value = progress.value;
        })
        .onUpdate((e) => {
          progress.value = applyRubberBand(
            startProgress.value + -e.translationX / SCREEN_WIDTH,
            0,
            MAX_PROGRESS,
          );
        })
        .onEnd((e) => {
          const projected =
            progress.value - e.velocityX / (SCREEN_WIDTH * VELOCITY_PROJECTION_K);
          const target = clamp(Math.round(projected), 0, MAX_PROGRESS);
          progress.value = withClamp(
            { min: 0, max: MAX_PROGRESS },
            withSpring(target, PAGER_SPRING_CONFIG),
          );
        }),
    [progress, startProgress],
  );

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -progress.value * SCREEN_WIDTH }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <Animated.View style={[styles.row, rowStyle]}>
          {pages.map((page, index) => (
            <View key={index} style={styles.page}>
              {page}
            </View>
          ))}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: PAGE_COUNT * SCREEN_WIDTH,
  },
  page: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
});
