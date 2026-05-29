import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IndexCardsCarousel } from '../components/market/IndexCardsCarousel';
import { MostActivesSection } from '../components/market/MostActivesSection';
import { getBottomBarPadding } from '../components/BottomBar';

export function MarketScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = getBottomBarPadding(insets.bottom);

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
