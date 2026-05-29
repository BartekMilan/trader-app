import MaskedView from '@react-native-masked-view/masked-view';
import { useId, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type HorizontalEdgeFadeProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function HorizontalEdgeFade({ children, style }: HorizontalEdgeFadeProps) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <View style={[styles.wrap, style]}>
      <MaskedView
        style={styles.masked}
        maskElement={
          <View style={styles.maskFill}>
            <Svg width="100%" height="100%" preserveAspectRatio="none">
              <Defs>
                <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0%" stopColor="#000" stopOpacity="0" />
                  <Stop offset="7%" stopColor="#000" stopOpacity="1" />
                  <Stop offset="93%" stopColor="#000" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#000" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
            </Svg>
          </View>
        }
      >
        {children}
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexGrow: 0,
  },
  masked: {
    flexGrow: 0,
  },
  maskFill: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
