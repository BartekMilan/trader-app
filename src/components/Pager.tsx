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
  container: { flex: 1, backgroundColor: 'transparent' },
  // width per page = screen width so pagingEnabled snaps one page per swipe.
  // Pages stretch to full height via the ScrollView content's default cross-axis stretch.
  page: { width: SCREEN_WIDTH, backgroundColor: 'transparent' },
});
