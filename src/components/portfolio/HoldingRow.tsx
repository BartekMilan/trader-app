import { StyleSheet, Text, View } from 'react-native';
import {
  formatPortfolioChange,
  formatPortfolioCurrency,
  formatPortfolioPercent,
  formatShares,
  type HoldingData,
} from '../../data/portfolioDummy';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_NEGATIVE,
  MARKET_POSITIVE,
  MARKET_TEXT_SECONDARY,
} from '../../theme';
import { Sparkline } from '../market/Sparkline';

const LOGO_SIZE = 40;
const SPARKLINE_WIDTH = 64;
const SPARKLINE_HEIGHT = 28;

type HoldingRowProps = {
  item: HoldingData;
};

function LogoPlaceholder({ ticker, color }: { ticker: string; color: string }) {
  return (
    <View style={[styles.logo, { backgroundColor: color }]}>
      <Text style={styles.logoText}>{ticker.charAt(0)}</Text>
    </View>
  );
}

export function HoldingRow({ item }: HoldingRowProps) {
  const marketValue = item.shares * item.currentPrice;
  const costBasis = item.shares * item.avgCost;
  const totalGain = marketValue - costBasis;
  const totalGainPercent = (totalGain / costBasis) * 100;
  const positive = totalGain >= 0;
  const trendColor = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  return (
    <View style={styles.row}>
      <LogoPlaceholder ticker={item.ticker} color={item.logoColor} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.meta}>
          {formatShares(item.shares)} shares · avg {formatPortfolioCurrency(item.avgCost)}
        </Text>
      </View>

      <View style={styles.sparklineWrap}>
        <Sparkline
          data={item.sparkline}
          width={SPARKLINE_WIDTH}
          height={SPARKLINE_HEIGHT}
          positive={positive}
        />
      </View>

      <View style={styles.valueBlock}>
        <Text style={styles.marketValue}>{formatPortfolioCurrency(marketValue)}</Text>
        <Text style={[styles.gainText, { color: trendColor }]}>
          {formatPortfolioChange(totalGain)} ({formatPortfolioPercent(totalGainPercent)})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: MARKET_GLASS_BG,
    borderWidth: 1,
    borderColor: MARKET_GLASS_BORDER,
    padding: 12,
    gap: 10,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  sparklineWrap: {
    width: SPARKLINE_WIDTH,
    alignItems: 'center',
  },
  valueBlock: {
    alignItems: 'flex-end',
    minWidth: 88,
  },
  marketValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  gainText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right',
  },
});
