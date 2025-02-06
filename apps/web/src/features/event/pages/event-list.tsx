import DashboardPageHeader from '@/components/layout/header/dashboard-page-header';
import EventTable from '../table/event-table/table';

export default function EventListPage() {
  return (
    <>
      <DashboardPageHeader
        title="Events"
        description="View and manage all events and activities"
      />
      <EventTable />
    </>
  );
}
