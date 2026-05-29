import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { STOCK_IDEAS, type StockIdeaItem } from '../../data/homeDummy';
import { MARKET_POSITIVE } from '../../theme';

const CARD_WIDTH = 260;

function StockIdeaCard({ item }: { item: StockIdeaItem }) {
  return (
    <View style={styles.card}>
      <View style={[styles.logo, { backgroundColor: item.logoColor }]}>
        <Text style={styles.logoText}>{item.logoLabel}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.buyButton}>
        <Text style={styles.buyText}>BUY</Text>
      </View>
    </View>
  );
}

export function StocksIdeaSection() {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Stocks Idea</Text>
        <Pressable style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        decelerationRate="fast"
      >
        {STOCK_IDEAS.map((item) => (
          <StockIdeaCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  viewAllText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  name: {
    flex: 1,
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: MARKET_POSITIVE,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buyText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
