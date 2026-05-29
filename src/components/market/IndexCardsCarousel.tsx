import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { INDEX_CARDS } from '../../data/marketDummy';
import { HorizontalEdgeFade } from './HorizontalEdgeFade';
import { INDEX_CARD_HEIGHT, IndexCard } from './IndexCard';

const CARD_GAP = 12;

export function IndexCardsCarousel() {
  return (
    <HorizontalEdgeFade style={styles.fade}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={styles.content}
        style={styles.carousel}
      >
        {INDEX_CARDS.map((item) => (
          <IndexCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </HorizontalEdgeFade>
  );
}

const styles = StyleSheet.create({
  fade: {
    height: INDEX_CARD_HEIGHT,
  },
  carousel: {
    flexGrow: 0,
    height: INDEX_CARD_HEIGHT,
  },
  content: {
    paddingHorizontal: 16,
    gap: CARD_GAP,
  },
});
