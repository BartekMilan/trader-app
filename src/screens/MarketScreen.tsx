import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IndexCardsCarousel } from '../components/market/IndexCardsCarousel';
import { MostActivesSection } from '../components/market/MostActivesSection';

const BOTTOM_BAR_ESTIMATE = 64;

export function MarketScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = BOTTOM_BAR_ESTIMATE + Math.max(insets.bottom, 12);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.carouselBand}>
        <IndexCardsCarousel />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <MostActivesSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  carouselBand: {
    paddingTop: 8,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
