import { StyleSheet, Text, View } from 'react-native';
import { formatChange, formatPrice, type MostActiveData } from '../../data/marketDummy';
import {
  MARKET_GLASS_BG,
  MARKET_GLASS_BORDER,
  MARKET_NEGATIVE,
  MARKET_POSITIVE,
  MARKET_TEXT_SECONDARY,
} from '../../theme';
import { Sparkline } from './Sparkline';

const LOGO_SIZE = 40;
const SPARKLINE_WIDTH = 72;
const SPARKLINE_HEIGHT = 32;

type MostActiveRowProps = {
  item: MostActiveData;
};

function LogoPlaceholder({ ticker, color }: { ticker: string; color: string }) {
  return (
    <View style={[styles.logo, { backgroundColor: color }]}>
      <Text style={styles.logoText}>{ticker.charAt(0)}</Text>
    </View>
  );
}

export function MostActiveRow({ item }: MostActiveRowProps) {
  const positive = item.change >= 0;
  const trendColor = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  return (
    <View style={styles.row}>
      <LogoPlaceholder ticker={item.ticker} color={item.logoColor} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.ticker}>{item.ticker}</Text>
      </View>

      <View style={styles.sparklineWrap}>
        <Sparkline
          data={item.sparkline}
          width={SPARKLINE_WIDTH}
          height={SPARKLINE_HEIGHT}
          positive={positive}
        />
      </View>

      <View style={styles.priceBlock}>
        <View style={[styles.changePill, { backgroundColor: trendColor }]}>
          <Text style={styles.changePillText}>{formatChange(item.change)}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
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
    gap: 12,
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
  ticker: {
    color: MARKET_TEXT_SECONDARY,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  sparklineWrap: {
    width: SPARKLINE_WIDTH,
    alignItems: 'center',
  },
  priceBlock: {
    alignItems: 'flex-end',
    minWidth: 72,
  },
  changePill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changePillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
});
