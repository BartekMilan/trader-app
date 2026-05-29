import { StyleSheet, Text, View } from 'react-native';
import { TODAYS_MARKET, type TodaysMarketItem } from '../../data/homeDummy';
import { SCREEN_WIDTH } from '../../constants';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_NEGATIVE,
  MARKET_POSITIVE,
} from '../../theme';
import { TrendArrow } from './TrendArrow';

const GRID_GAP = 12;
const GRID_PADDING = 16;
const TILE_WIDTH = (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP) / 2;

function MarketTile({ item }: { item: TodaysMarketItem }) {
  const changeColor = item.positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  return (
    <View style={styles.tile}>
      <View style={styles.tileTopRow}>
        <Text style={styles.tileLabel}>{item.label}</Text>
        <Text style={[styles.tileChange, { color: changeColor }]}>{item.change}</Text>
      </View>
      <View style={styles.tileBottomRow}>
        <Text style={styles.tileValue}>{item.value}</Text>
        <TrendArrow positive={item.positive} />
      </View>
    </View>
  );
}

export function TodaysMarketGrid() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today&apos;s Market</Text>
      <View style={styles.grid}>
        {TODAYS_MARKET.map((item) => (
          <MarketTile key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: TILE_WIDTH,
    borderRadius: 16,
    backgroundColor: MARKET_GLASS_BG,
    borderWidth: 1,
    borderColor: MARKET_GLASS_BORDER,
    padding: 14,
    minHeight: 96,
    justifyContent: 'space-between',
  },
  tileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tileLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 1,
  },
  tileChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  tileBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  tileValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
});
