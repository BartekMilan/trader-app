import { StyleSheet, Text, View } from 'react-native';
import { MOST_ACTIVES } from '../../data/marketDummy';
import { MostActiveRow } from './MostActiveRow';

export function MostActivesSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Most Actives</Text>
      <View style={styles.list}>
        {MOST_ACTIVES.map((item) => (
          <MostActiveRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
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
