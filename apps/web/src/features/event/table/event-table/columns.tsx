'use client';

import { Badge, BadgeProps } from '@feedbacker/ui';
import { RiExternalLinkLine } from '@remixicon/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../../components/ui/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '../../../../components/ui/data-table/DataTableRowActions';
import { statuses } from './data/data';
import { Usage } from './data/schema';

const columnHelper = createColumnHelper<Usage>();

export const columns = [
  columnHelper.accessor('endpoint', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Endpoint" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      displayName: 'endpoint',
      className: 'text-left truncate whitespace-nowrap max-w-76',
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <RiExternalLinkLine className="size-5" />
        <span className="text-left truncate whitespace-nowrap">
          {row.original.endpoint}
        </span>
      </div>
    ),
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
  columnHelper.accessor('region', {
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
  columnHelper.accessor('stability', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stability" />
    ),
    enableSorting: false,
    meta: {
      className: 'text-left',
      displayName: 'Stability',
    },
    cell: ({ getValue }) => {
      const value = getValue();

      function Indicator({ number }: { number: number }) {
        let category;
        if (number === 0) {
          category = 'zero';
        } else if (number < 9) {
          category = 'bad';
        } else if (number >= 9 && number <= 15) {
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
          </div>
        );
      }

      return (
        <div className="flex items-center gap-0.5">
          <span className="w-6">{value}</span>
          <Indicator number={value} />
        </div>
      );
    },
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
] as ColumnDef<Usage>[];
