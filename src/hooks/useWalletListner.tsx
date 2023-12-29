import { useEffect } from 'react'
import { useAddress, useWallet } from '@thirdweb-dev/react'
import { useDisconnect } from '@thirdweb-dev/react'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useWalletListener = () => {
  const address = useAddress()
  const session = useSession()
  const router = useRouter()
  const disconnect = useDisconnect()
  const wallet = useWallet()

  const logout = () => {
    signOut({ callbackUrl: '/', redirect: false })
      .then(() => {
        router.asPath = '/'
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        disconnect()
      })
  }

  useEffect(() => {
    if (wallet) {
      wallet.addListener('disconnect', logout)
    }

    return () => {
      if (wallet) {
        wallet.removeListener('disconnect', logout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  // check on wallet change
  useEffect(() => {
    if (wallet && session.status === 'authenticated' && session.data?.user.address !== address) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])
}
