import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBottomBarPadding } from '../components/BottomBar';
import { AllocationSection } from '../components/portfolio/AllocationSection';
import { HoldingsSection } from '../components/portfolio/HoldingsSection';
import { PerformanceSection } from '../components/portfolio/PerformanceSection';
import { PortfolioSummaryCard } from '../components/portfolio/PortfolioSummaryCard';

export function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = getBottomBarPadding(insets.bottom);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PortfolioSummaryCard />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <PerformanceSection />
        <AllocationSection />
        <HoldingsSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 12,
  },
});
