import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTablePagination } from '@/components/ui/data-table/DataTablePagination';
import { columns } from './columns';
import { usage } from './data/data';
import { Filterbar } from './DataTableFilterbar';

export default function EventTable() {
  return (
    <div className="space-y-3 ">
      <Filterbar />
      <DataTable data={usage} columns={columns} />
      <DataTablePagination pageSize={20} />
    </div>
  );
}
