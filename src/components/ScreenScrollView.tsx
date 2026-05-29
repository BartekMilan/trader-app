import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBottomBarPadding } from './BottomBar';

type ScreenScrollViewProps = {
  children: ReactNode;
  header?: ReactNode;
  scrollContentStyle?: StyleProp<ViewStyle>;
};

export function ScreenScrollView({ children, header, scrollContentStyle }: ScreenScrollViewProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = getBottomBarPadding(insets.bottom);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {header}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }, scrollContentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
