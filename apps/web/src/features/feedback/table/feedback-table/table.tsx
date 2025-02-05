import { DataTable } from '@/components/ui/data-table/DataTable';
import { columns } from './columns';
import { usage } from './data/data';

export default function FeedbackTable() {
  return (
    <div className="space-y-3">
      {/* <Filterbar table={table} /> */}

      <DataTable data={usage} columns={columns} />
      {/* <DataTablePagination table={table} pageSize={20} /> */}
    </div>
  );
}
