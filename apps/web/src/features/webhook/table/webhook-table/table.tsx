import { DataTable } from '@/components/ui/data-table/DataTable';
import { columns } from './columns';
import { usage } from './data/data';

export default function WebhookTable() {
  return (
    <div className="space-y-3 ">
      <DataTable data={usage} columns={columns} />
    </div>
  );
}
