import { StyleSheet, Text, View } from 'react-native';
import {
  formatChange,
  formatChangePercent,
  formatPrice,
  type IndexCardData,
} from '../../data/marketDummy';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_NEGATIVE,
  MARKET_POSITIVE,
  MARKET_TEXT_SECONDARY,
} from '../../theme';
import { Sparkline } from './Sparkline';

const CARD_WIDTH = 148;
const CARD_HEIGHT = 200;
const SPARKLINE_WIDTH = CARD_WIDTH - 32;
const SPARKLINE_HEIGHT = 56;

type IndexCardProps = {
  item: IndexCardData;
};

export function IndexCard({ item }: IndexCardProps) {
  const positive = item.change >= 0;
  const trendColor = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.ticker}>{item.ticker}</Text>

      <View style={styles.sparklineWrap}>
        <Sparkline
          data={item.sparkline}
          width={SPARKLINE_WIDTH}
          height={SPARKLINE_HEIGHT}
          positive={positive}
        />
      </View>

      <Text style={styles.price}>{formatPrice(item.price)}</Text>
      <Text style={[styles.change, { color: trendColor }]}>
        {formatChange(item.change)} {formatChangePercent(item.changePercent)}
      </Text>
    </View>
  );
}

export const INDEX_CARD_WIDTH = CARD_WIDTH;
export const INDEX_CARD_HEIGHT = CARD_HEIGHT;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: MARKET_GLASS_BG,
    borderWidth: 1,
    borderColor: MARKET_GLASS_BORDER,
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ticker: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  sparklineWrap: {
    marginVertical: 8,
    alignItems: 'center',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
