import { StyleSheet, Text, View } from 'react-native';
import { HOLDINGS } from '../../data/portfolioDummy';
import { HoldingRow } from './HoldingRow';

export function HoldingsSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Your holdings</Text>
      <View style={styles.list}>
        {HOLDINGS.map((item) => (
          <HoldingRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
});
