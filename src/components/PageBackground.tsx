import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PAGE_GRADIENTS, type PageGradient } from '../theme';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GRADIENT_START = { x: 0.05, y: 0 };
const GRADIENT_END = { x: 0.45, y: 1 };

type PageBackgroundProps = {
  progress: SharedValue<number>;
};

function layerOpacity(progress: number, pageIndex: number) {
  'worklet';
  return interpolate(
    Math.abs(progress - pageIndex),
    [0, 1],
    [1, 0],
    Extrapolation.CLAMP,
  );
}

function GradientLayer({
  pageIndex,
  progress,
  gradient,
}: {
  pageIndex: number;
  progress: SharedValue<number>;
  gradient: PageGradient;
}) {
  const layerStyle = useAnimatedStyle(() => ({
    opacity: layerOpacity(progress.value, pageIndex),
  }));

  return (
    <AnimatedLinearGradient
      pointerEvents="none"
      colors={[...gradient.colors]}
      locations={[...gradient.locations]}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={[styles.layer, layerStyle]}
    />
  );
}

export function PageBackground({ progress }: PageBackgroundProps) {
  return (
    <Animated.View pointerEvents="none" style={styles.root}>
      {PAGE_GRADIENTS.map((gradient, index) => (
        <GradientLayer
          key={index}
          pageIndex={index}
          progress={progress}
          gradient={gradient}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
  },
  layer: {
    ...StyleSheet.absoluteFill,
  },
});
