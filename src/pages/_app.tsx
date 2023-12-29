// ** Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ThirdwebProvider, coinbaseWallet, metamaskWallet, walletConnect } from '@thirdweb-dev/react'

import '@/styles/globals.css'
import { BlankLayout } from '@/layouts'
import { SessionProvider } from 'next-auth/react'
import { GuardLayout } from '@/layouts/GuardLayout'

// ** Extend App Props
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>)
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false

  return (
    <SessionProvider session={pageProps.session}>
      <ThirdwebProvider
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        autoConnect={true}
        authConfig={{
          // Here we specify the domain, which should match the domain
          // conigured on the backend
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || ''
        }}
        clientId='3828bedc82f5ba0e923c413da3250b1a'
      >
        <GuardLayout authGuard={authGuard} guestGuard={guestGuard}>
          {getLayout(<Component {...pageProps} />)}
        </GuardLayout>
      </ThirdwebProvider>
    </SessionProvider>
  )
}
