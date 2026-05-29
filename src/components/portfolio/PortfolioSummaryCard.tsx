import { StyleSheet, Text, View } from 'react-native';
import { PORTFOLIO_SUMMARY, formatPortfolioChange, formatPortfolioCurrency, formatPortfolioPercent } from '../../data/portfolioDummy';
import { MARKET_POSITIVE } from '../../theme';
import { TrendArrow } from '../home/TrendArrow';

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export function PortfolioSummaryCard() {
  const { totalBalance, dayChange, dayChangePercent, invested, availableCash } = PORTFOLIO_SUMMARY;
  const positive = dayChange >= 0;

  return (
    <View style={styles.section}>
      <View style={styles.card}>
        <Text style={styles.balanceLabel}>Total balance</Text>
        <Text style={styles.balanceValue}>{formatPortfolioCurrency(totalBalance)}</Text>

        <View style={styles.dayChangeRow}>
          <TrendArrow positive={positive} size={16} />
          <Text style={[styles.dayChangeText, positive ? styles.positive : styles.negative]}>
            {formatPortfolioChange(dayChange)} ({formatPortfolioPercent(dayChangePercent)})
          </Text>
          <Text style={styles.dayChangeHint}>today</Text>
        </View>

        <View style={styles.statsRow}>
          <SummaryStat label="Invested" value={formatPortfolioCurrency(invested)} />
          <View style={styles.statDivider} />
          <SummaryStat label="Available cash" value={formatPortfolioCurrency(availableCash)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#1A8F6A',
    padding: 20,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    marginTop: 8,
  },
  dayChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  dayChangeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  positive: {
    color: MARKET_POSITIVE,
  },
  negative: {
    color: '#FECACA',
  },
  dayChangeHint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
});
