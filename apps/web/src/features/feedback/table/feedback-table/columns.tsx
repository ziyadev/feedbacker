'use client';

import { FeedbackModel } from '@/graphql/types';
import {
  Avatar,
  AvatarFallback,
  Badge,
  BadgeProps,
  Checkbox,
  Tooltip,
} from '@feedbacker/ui';
import { timeAgo } from '@repo/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../../components/ui/data-table/DataTableColumnHeader';
import { DataTableRowActions } from './DataTableRowActions';
import { priorities, statuses } from './data/data';

const columnHelper = createColumnHelper<FeedbackModel>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
            ? 'indeterminate'
            : false
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        className="translate-y-0.5"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        className="translate-y-0.5"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: 'Select',
    },
  }),
  columnHelper.accessor('metadata', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      displayName: 'User',
    },
    cell: ({ row }) => {
      const findEmail = row.original.metadata?.find(
        (m) => m.key === 'email'
      )?.value;
      const id = row.original.metadata?.find((m) => m.key === 'userId')?.value;
      const user = findEmail || id;

      return (
        <Tooltip content={id}>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
              <AvatarFallback>{user?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-left truncate whitespace-nowrap max-w-48">
              {user}
          </span>
        </div>
        </Tooltip>

      );
    },
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    meta: {
      className: 'text-left',
      displayName: 'Status',
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <Badge variant={status.variant as BadgeProps['variant']}>
          {status.label}
        </Badge>
      );
    },
  }),
  columnHelper.accessor('country', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    enableSorting: false,
    meta: {
      className: 'text-left',
      displayName: 'Region',
    },
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor('rating', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    enableSorting: false,
    meta: {
      className: 'text-left',
      displayName: 'Rating',
    },
    cell: ({ getValue }) => {
      const value = getValue();

      function Indicator({ number }: { number: number }) {
        let category;
        if (number === 0) {
          category = 'zero';
        } else if (number < 2) {
          category = 'bad';
        } else if (number >= 3) {
          category = 'ok';
        } else {
          category = 'good';
        }

        const getBarClass = (index: number) => {
          if (category === 'zero') {
            return 'bg-gray-300 dark:bg-gray-800';
          } else if (category === 'good') {
            return 'bg-indigo-600 dark:bg-indigo-500';
          } else if (category === 'ok' && index < 2) {
            return 'bg-indigo-600 dark:bg-indigo-500';
          } else if (category === 'bad' && index < 1) {
            return 'bg-indigo-600 dark:bg-indigo-500';
          }
          return 'bg-gray-300 dark:bg-gray-800';
        };

        return (
          <div className="flex gap-0.5">
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(3)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(4)}`} />
          </div>
        );
      }

      if (!value) {
        return <span className="w-6">-</span>;
      }
      return (
        <div className="flex items-center gap-0.5">
          <span className="w-6">{value}</span>
          <Indicator number={value} />
        </div>
      );
    },
  }),
  columnHelper.accessor('priority', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    enableSorting: true,
    meta: {
      className: 'text-left',
      displayName: 'Priority',
    },
    cell: ({ getValue }) => {
      const priority = priorities.find((item) => item.value === getValue());

      if (!priority) {
        return null;
      }

      return (
        <Badge variant={priority.variant as BadgeProps['variant']}>
          {priority.label}
        </Badge>
      );
    },
  }),
  columnHelper.accessor('updatedAt', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated at" />
    ),
    enableSorting: false,
    meta: {
      className: 'tabular-nums',
      displayName: 'Updated at',
    },
    cell: ({ cell }) => <span>{timeAgo(cell.getValue(), { withAgo: true })}</span>,
  }),
  columnHelper.accessor('createdAt', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    enableSorting: false,
    meta: {
      className: 'tabular-nums',
      displayName: 'Created at',
    },
    cell: ({ cell }) => <span>{new Date(cell.getValue()).toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "numeric", day: "numeric" })
    }</span>,

  }),
  columnHelper.display({
    id: 'edit',
    header: 'Edit',
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'text-right',
      displayName: 'Edit',
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
] as ColumnDef<FeedbackModel>[];
