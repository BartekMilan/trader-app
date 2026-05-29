import { StyleSheet, View } from 'react-native';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { IndexCardsCarousel } from '../components/market/IndexCardsCarousel';
import { MostActivesSection } from '../components/market/MostActivesSection';

export function MarketScreen() {
  return (
    <ScreenScrollView
      header={
        <View style={styles.carouselBand}>
          <IndexCardsCarousel />
        </View>
      }
    >
      <MostActivesSection />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  carouselBand: {
    paddingTop: 8,
  },
});
