import { StyleSheet, Text, View } from 'react-native';
import { ALLOCATION } from '../../data/portfolioDummy';
import { SCREEN_WIDTH } from '../../constants';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_TEXT_SECONDARY,
} from '../../theme';

const BAR_WIDTH = SCREEN_WIDTH - 64;

function AllocationBar() {
  return (
    <View style={styles.barTrack}>
      {ALLOCATION.map((item) => (
        <View
          key={item.id}
          style={[styles.barSegment, { flex: item.percent, backgroundColor: item.color }]}
        />
      ))}
    </View>
  );
}

export function AllocationSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Allocation</Text>

      <View style={styles.card}>
        <AllocationBar />

        <View style={styles.legend}>
          {ALLOCATION.map((item) => (
            <View key={item.id} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <View style={styles.legendTextWrap}>
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={styles.legendPercent}>{item.percent}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  card: {
    borderRadius: 20,
    backgroundColor: MARKET_GLASS_BG,
    borderWidth: 1,
    borderColor: MARKET_GLASS_BORDER,
    padding: 16,
  },
  barTrack: {
    flexDirection: 'row',
    width: BAR_WIDTH,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barSegment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '47%',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  legendLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  legendPercent: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 13,
    fontWeight: '600',
  },
});
