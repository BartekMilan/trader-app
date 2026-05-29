import { ScreenScrollView } from '../components/ScreenScrollView';
import { DateTimeHeader } from '../components/home/DateTimeHeader';
import { PortfolioOverviewCard } from '../components/home/PortfolioOverviewCard';
import { SearchBar } from '../components/home/SearchBar';
import { StocksIdeaSection } from '../components/home/StocksIdeaSection';
import { TodaysMarketGrid } from '../components/home/TodaysMarketGrid';

export function HomeScreen() {
  return (
    <ScreenScrollView>
      <DateTimeHeader />
      <SearchBar />
      <PortfolioOverviewCard />
      <TodaysMarketGrid />
      <StocksIdeaSection />
    </ScreenScrollView>
  );
}
