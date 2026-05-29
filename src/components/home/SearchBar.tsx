import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Circle cx={8} cy={8} r={5.5} stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
      <Path
        d="M12.5 12.5L16 16"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SearchBar() {
  return (
    <View style={styles.container} pointerEvents="none">
      <SearchIcon />
      <Text style={styles.placeholder}>Search stocks, funds, commodities, etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  placeholder: {
    flex: 1,
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
    fontWeight: '500',
  },
});
