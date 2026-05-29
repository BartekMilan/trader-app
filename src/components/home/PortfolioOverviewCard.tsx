import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { PORTFOLIO_OVERVIEW } from '../../data/homeDummy';
import { MARKET_NEGATIVE, MARKET_POSITIVE } from '../../theme';

function StatArrow({ positive }: { positive: boolean }) {
  if (positive) {
    return (
      <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
        <Path d="M6 2L10 8H2L6 2Z" fill="#FFFFFF" />
      </Svg>
    );
  }

  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M6 10L2 4H10L6 10Z" fill="#FFFFFF" />
    </Svg>
  );
}

function MenuDots() {
  return (
    <View style={styles.menuButton}>
      <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <Circle cx={8} cy={3.5} r={1.25} fill="#FFFFFF" />
        <Circle cx={8} cy={8} r={1.25} fill="#FFFFFF" />
        <Circle cx={8} cy={12.5} r={1.25} fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

type StatBlockProps = {
  label: string;
  amount: string;
  percent: string;
  positive: boolean;
};

function StatBlock({ label, amount, percent, positive }: StatBlockProps) {
  const accent = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  return (
    <View style={styles.statBlock}>
      <View style={[styles.statIconWrap, { backgroundColor: accent }]}>
        <StatArrow positive={positive} />
      </View>
      <View style={styles.statTextWrap}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>
          {amount} ({percent})
        </Text>
      </View>
    </View>
  );
}

export function PortfolioOverviewCard() {
  const { currentValue, totalGain, totalLoss } = PORTFOLIO_OVERVIEW;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Portfolio Overview</Text>
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.currentValueLabel}>Current value</Text>
          <MenuDots />
        </View>
        <Text style={styles.currentValue}>{currentValue}</Text>
        <View style={styles.statsRow}>
          <StatBlock
            label="Total gain"
            amount={totalGain.amount}
            percent={totalGain.percent}
            positive
          />
          <StatBlock
            label="Total loss"
            amount={totalLoss.amount}
            percent={totalLoss.percent}
            positive={false}
          />
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
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#2563EB',
    padding: 20,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentValueLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTextWrap: {
    flex: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
});
