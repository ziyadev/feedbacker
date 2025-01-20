

import { PropsWithChildren } from 'react'
import { DashLayout } from '@/components/layout/dash-layout'


export default function Layout({ children }: PropsWithChildren) {

  return (
    <DashLayout>
      {children}
    </DashLayout>
  )
}