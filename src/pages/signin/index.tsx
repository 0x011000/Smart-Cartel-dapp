// ** Next Imports
import { useRouter } from 'next/router'
import { Url } from 'next/dist/shared/lib/router/router'

import { signIn } from 'next-auth/react'

import { ConnectWallet, useAddress, useAuth } from '@thirdweb-dev/react'
import { Inter } from 'next/font/google'
import { BlankLayout } from '@/layouts'

const inter = Inter({ subsets: ['latin'] })

export default function SignInPage() {
  const address = useAddress()
  const auth = useAuth()
  const router = useRouter()

  const loginWithWallet = async () => {
    try {
      // Prompt the user to sign a login with wallet message
      const payload = await auth?.login()

      // Then send the payload to next auth as login credentials
      // using the "credentials" provider method
      await signIn('credentials', {
        payload: JSON.stringify(payload),
        redirect: false
      }).then(res => {
        if (res && res.ok) {
          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as Url)
        }
      })
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <main className={` ${inter.className}`}>
      {Boolean(address) && <button onClick={loginWithWallet}>Sign in</button>}

      {!Boolean(address) && <ConnectWallet />}
    </main>
  )
}

SignInPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
SignInPage.guestGuard = true
