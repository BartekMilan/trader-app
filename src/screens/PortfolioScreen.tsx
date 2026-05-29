import { StyleSheet } from 'react-native';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { AllocationSection } from '../components/portfolio/AllocationSection';
import { HoldingsSection } from '../components/portfolio/HoldingsSection';
import { PerformanceSection } from '../components/portfolio/PerformanceSection';
import { PortfolioSummaryCard } from '../components/portfolio/PortfolioSummaryCard';

export function PortfolioScreen() {
  return (
    <ScreenScrollView
      header={<PortfolioSummaryCard />}
      scrollContentStyle={styles.scrollContent}
    >
      <PerformanceSection />
      <AllocationSection />
      <HoldingsSection />
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 12,
  },
});
