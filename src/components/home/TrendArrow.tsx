import Svg, { Path } from 'react-native-svg';
import { MARKET_NEGATIVE, MARKET_POSITIVE } from '../../theme';

type TrendArrowProps = {
  positive: boolean;
  size?: number;
};

export function TrendArrow({ positive, size = 18 }: TrendArrowProps) {
  const color = positive ? MARKET_POSITIVE : MARKET_NEGATIVE;

  if (positive) {
    return (
      <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <Path
          d="M9 3L15 11H3L9 3Z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 15L3 7H15L9 15Z"
        fill={color}
      />
    </Svg>
  );
}
