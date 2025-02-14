import { cx } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'animate-pulse rounded-md dark:bg-gray-900 bg-gray-50',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
