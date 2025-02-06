import DashboardPageHeader from '@/components/layout/header/dashboard-page-header';
import WebhookTable from '../table/webhook-table/table';

export default function WebhookListPage() {
  return (
    <>
      <DashboardPageHeader
        title="Webhooks"
        description="Manage and monitor your webhook endpoints"
      />
      <WebhookTable />
    </>
  );
}
