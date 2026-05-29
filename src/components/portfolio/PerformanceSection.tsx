import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  PERFORMANCE_CHANGE,
  PERFORMANCE_PERIODS,
  PERFORMANCE_SPARKLINES,
  type PerformancePeriod,
  formatPortfolioChange,
  formatPortfolioPercent,
} from '../../data/portfolioDummy';
import { SCREEN_WIDTH } from '../../constants';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_POSITIVE,
  MARKET_TEXT_SECONDARY,
} from '../../theme';
import { Sparkline } from '../market/Sparkline';

const SPARKLINE_WIDTH = SCREEN_WIDTH - 64;
const SPARKLINE_HEIGHT = 88;

export function PerformanceSection() {
  const [period, setPeriod] = useState<PerformancePeriod>('1M');
  const change = PERFORMANCE_CHANGE[period];
  const positive = change.value >= 0;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Performance</Text>

      <View style={styles.card}>
        <View style={styles.periodRow}>
          {PERFORMANCE_PERIODS.map((item) => {
            const active = item === period;
            return (
              <Pressable
                key={item}
                onPress={() => setPeriod(item)}
                style={[styles.periodPill, active && styles.periodPillActive]}
              >
                <Text style={[styles.periodText, active && styles.periodTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sparklineWrap}>
          <Sparkline
            data={PERFORMANCE_SPARKLINES[period]}
            width={SPARKLINE_WIDTH}
            height={SPARKLINE_HEIGHT}
            positive={positive}
          />
        </View>

        <View style={styles.changeRow}>
          <Text style={[styles.changeValue, { color: positive ? MARKET_POSITIVE : '#F87171' }]}>
            {formatPortfolioChange(change.value)}
          </Text>
          <Text style={styles.changePercent}>{formatPortfolioPercent(change.percent)}</Text>
        </View>
        <Text style={styles.changeHint}>Portfolio return for selected period</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
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
  periodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  periodPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  periodPillActive: {
    backgroundColor: 'rgba(61,214,168,0.25)',
    borderColor: '#3DD6A8',
  },
  periodText: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: '600',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  sparklineWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  changeValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  changePercent: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 14,
    fontWeight: '600',
  },
  changeHint: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
