import Svg, { Path } from 'react-native-svg';

type HomeIconProps = {
  size?: number;
  color?: string;
};

export function HomeIcon({ size = 18, color = '#FFFFFF' }: HomeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M3 7.5L9 2.5L15 7.5V14.5C15 15.05 14.55 15.5 14 15.5H4C3.45 15.5 3 15.05 3 14.5V7.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M7 15.5V10H11V15.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
