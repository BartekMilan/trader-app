import { StyleSheet, Text, View } from 'react-native';

export function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});
