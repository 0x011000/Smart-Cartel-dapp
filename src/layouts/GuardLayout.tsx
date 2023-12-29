// ** React Imports
import { ReactNode } from 'react'
import { useWalletListener } from '@/hooks'

import GuestGuard from '@/components/auth/GuestGuard'
import AuthGuard from '@/components/auth/AuthGuard'
import { Spinner } from '@/components/Spinner'

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}
export const GuardLayout = ({ children, authGuard, guestGuard }: GuardProps) => {
  useWalletListener()
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}
