

import { PropsWithChildren } from 'react'
import { DashLayout } from '@/components/layout/dash-layout'


export default function Layout({ children }: PropsWithChildren) {

  return (
    <DashLayout>
      <div className="relative">
        <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
          {children}
        </div>
      </div>
    </DashLayout>
  )
}