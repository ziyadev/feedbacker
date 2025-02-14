import DashboardPageHeader from '@/components/layout/header/dashboard-page-header';
import FeedbackTable from '../table/feedback-table/table';

export default function FeedbackListPage() {
  return (
    <>
      <DashboardPageHeader
        title="All Feedback & Suggestions"
        description="Manage and analyze all user-submitted feedback"
      />

      <FeedbackTable />
    </>
  );
}
