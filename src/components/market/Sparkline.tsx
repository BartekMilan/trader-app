import { useId, useMemo } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { MARKET_NEGATIVE, MARKET_POSITIVE } from '../../theme';
import type { MarketSparkline } from '../../data/marketDummy';

type SparklineProps = {
  data: MarketSparkline;
  width: number;
  height: number;
  positive: boolean;
};

function buildPaths(data: MarketSparkline, width: number, height: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const paddingY = 2;
  const innerHeight = height - paddingY * 2;
  const stepX = data.length > 1 ? width / (data.length - 1) : width;

  const points = data.map((value, index) => ({
    x: index * stepX,
    y: paddingY + innerHeight - ((value - min) / range) * innerHeight,
  }));

  const line = points.reduce(
    (path, point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`,
    '',
  );

  const last = points[points.length - 1];
  const area = `${line} L ${last.x} ${height} L 0 ${height} Z`;

  return { line, area };
}

export function Sparkline({ data, width, height, positive }: SparklineProps) {
  const color = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;
  const { line, area } = useMemo(() => buildPaths(data, width, height), [data, width, height]);
  const gradientId = `${useId().replace(/:/g, '')}-${positive ? 'up' : 'down'}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill={`url(#${gradientId})`} />
      <Path d={line} stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
