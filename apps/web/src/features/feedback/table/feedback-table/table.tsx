'use client';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTablePagination } from '@/components/ui/data-table/DataTablePagination';
import { client } from '@/services/admin-client';
import { columns } from './columns';
import { Filterbar } from './DataTableFilterbar';

export default function FeedbackTable() {
  const { data, loading } = client.feedback.getAll.useQuery();
  if (loading) return 'loading...';
  return (
    <div className="space-y-3 ">
      <Filterbar />
      <DataTable data={data?.getFeedbacks.nodes} columns={columns} />
      <DataTablePagination pageSize={20} />
    </div>
  );
}
