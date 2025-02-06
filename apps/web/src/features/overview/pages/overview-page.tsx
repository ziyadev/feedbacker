import DashboardPageHeader from '@/components/layout/header/dashboard-page-header';
import OverviewAnalytics from '../components/overview-analytics';
export default function OverviewPage() {
  return (
    <>
      <DashboardPageHeader
        title="Overview"
        description="Analyze and understand your web traffic."
      />
      <OverviewAnalytics />
    </>
  );
}
