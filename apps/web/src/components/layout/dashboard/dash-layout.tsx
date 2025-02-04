'use client';
import { PropsWithChildren } from 'react';
import { Sidebar } from '../navigation/sidebar';

export const DashLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Sidebar />
      <main className="lg:pl-72">{children}</main>
    </div>
  );
};
