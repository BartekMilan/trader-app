import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DateTimeHeader } from '../components/home/DateTimeHeader';
import { PortfolioOverviewCard } from '../components/home/PortfolioOverviewCard';
import { SearchBar } from '../components/home/SearchBar';
import { StocksIdeaSection } from '../components/home/StocksIdeaSection';
import { TodaysMarketGrid } from '../components/home/TodaysMarketGrid';
import { getBottomBarPadding } from '../components/BottomBar';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = getBottomBarPadding(insets.bottom);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <DateTimeHeader />
        <SearchBar />
        <PortfolioOverviewCard />
        <TodaysMarketGrid />
        <StocksIdeaSection />
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
  },
});
