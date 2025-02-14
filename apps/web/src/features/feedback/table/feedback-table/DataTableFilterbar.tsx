'use client';

import { cx } from '@/components/lib/utils';
import { Searchbar } from '@/components/ui/data-table/Searchbar';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@feedbacker/ui';
import { RiFilterLine } from '@remixicon/react';
import { useQueryState } from 'nuqs';
import { ComponentProps } from 'react';
import { statuses } from './data/data';

export function Filterbar({ className, ...props }: ComponentProps<'div'>) {
  const [feedbackId, setFeedbackId] = useQueryState('feedbackId')
  const [userId, setUserId] = useQueryState('userId')
  const [status, setStatus] = useQueryState('status')

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
          <Select value={status} onValueChange={(v) => setStatus(v)}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Searchbar
          placeholder="Search for an exact feedback ID... "
          value={feedbackId}
          onChange={(e) => setFeedbackId(e.target.value)}
        />
        <Searchbar
          placeholder="Search for an exact user ID... "
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          <RiFilterLine className="size-4 mr-2" aria-hidden="true" />
          Advanced filter
        </Button>
      </div>
    </div>
  );
}
