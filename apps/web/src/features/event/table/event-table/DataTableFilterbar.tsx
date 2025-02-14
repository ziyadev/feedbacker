'use client';

import { cx } from '@/components/lib/utils';
import { Searchbar } from '@/components/ui/data-table/Searchbar';
import {
  DateRangePicker,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DateRange,
} from '@feedbacker/ui';
import { ComponentProps, useState } from 'react';

export function Filterbar({ className, ...props }: ComponentProps<'div'>) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <div
      className={cx(
        className,
        'flex flex-wrap items-center justify-between gap-2 sm:gap-x-6'
      )}
      {...props}
    >
      <div className="flex flex-auto items-start gap-2 lg:items-center max-sm:flex-col">
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: 'all', label: 'All types' }].map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Searchbar placeholder="Search for an exact event name... " />
      </div>
      <div className="flex items-center gap-2">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
    </div>
  );
}
