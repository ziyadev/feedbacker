'use client';
import { ChartCard } from './DashboardChartCard';
import { Filterbar } from './DashboardFilterbar';
import { overviews } from './data/overview-data';
import { OverviewData } from './data/schema';
import { cx } from '@/lib/utils';
import { subDays, toDate } from 'date-fns';
import React from 'react';
import { DateRange } from 'react-day-picker';

export type PeriodValue = 'previous-period' | 'last-year' | 'no-comparison';

const categories: {
  title: keyof OverviewData;
  type: 'currency' | 'unit';
}[] = [
  {
    title: 'Rows read',
    type: 'unit',
  },
  {
    title: 'Rows written',
    type: 'unit',
  },
  {
    title: 'Queries',
    type: 'unit',
  },
  {
    title: 'Payments completed',
    type: 'currency',
  },
  {
    title: 'Sign ups',
    type: 'unit',
  },
  {
    title: 'Logins',
    type: 'unit',
  },
  {
    title: 'Sign outs',
    type: 'unit',
  },
  {
    title: 'Support calls',
    type: 'unit',
  },
];

export type KpiEntry = {
  title: string;
  percentage: number;
  current: number;
  allowed: number;
  unit?: string;
};

export type KpiEntryExtended = Omit<
  KpiEntry,
  'current' | 'allowed' | 'unit'
> & {
  value: string;
  color: string;
};

const overviewsDates = overviews.map((item) => toDate(item.date).getTime());
const maxDate = toDate(Math.max(...overviewsDates));

export default function Overview() {
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 30),
    to: maxDate,
  });
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PeriodValue>('last-year');

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categories.map((category) => category.title)
  );

  return (
    <section aria-labelledby="overview">
      <div className="sticky top-16 z-20 flex items-center justify-between border-b border-gray-200 bg-white pb-4 pt-4 sm:pt-6 lg:top-0 lg:mx-0 lg:px-0 lg:pt-8 dark:border-gray-800 dark:bg-gray-950">
        <Filterbar
          maxDate={maxDate}
          minDate={new Date(2024, 0, 1)}
          selectedDates={selectedDates}
          onDatesChange={(dates) => setSelectedDates(dates)}
          selectedPeriod={selectedPeriod}
          onPeriodChange={(period) => setSelectedPeriod(period)}
          categories={categories}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
      </div>
      <dl
        className={cx(
          'mt-10 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
        )}
      >
        {categories
          .filter((category) => selectedCategories.includes(category.title))
          .map((category) => {
            return (
              <ChartCard
                key={category.title}
                title={category.title}
                type={category.type}
                selectedDates={selectedDates}
                selectedPeriod={selectedPeriod}
              />
            );
          })}
      </dl>
    </section>
  );
}
