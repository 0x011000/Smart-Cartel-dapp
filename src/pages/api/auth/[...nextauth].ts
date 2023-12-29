import { ThirdwebAuthProvider, authSession } from '@thirdweb-dev/auth/next-auth'
import NextAuth from 'next-auth'

const nonces: string[] = []

export default NextAuth({
  providers: [
    // Add the thirdweb auth provider to the providers configuration
    ThirdwebAuthProvider({
      domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
      authOptions: {
        // need to configure a database to store nonce
        validateNonce: async (nonce: string) => {
          // Check in database or storage if nonce exists
          // const nonceExists = await dbExample.nonceExists(nonce)
          if (nonces.includes(nonce)) {
            throw new Error('Nonce has already been used!')
          }

          console.log(nonce)

          nonces.push(nonce)

          // Otherwise save nonce in database or storage for later validation
          // await dbExample.saveNonce(nonce)
        }
      }
    })
  ],
  callbacks: {
    // Add the authSession callback to the callbacks configuration
    // session: authSession

    // Add custom logic to the session callback
    async session({ session, token }) {
      const sessionWithAddress = await authSession({ session, token })

      const address = sessionWithAddress.user.address

      // Run your own custom logic here
      // need to add custom database to add multiple users
      // this data should be fetched from database
      sessionWithAddress.user = {
        ...sessionWithAddress.user,
        id: 1,
        role: 'admin',
        username: address || null,
        fullName: address || null,
        email: null
      }

      // Extend the session expiration
      sessionWithAddress.expires = (Date.now() + 30 * 24 * 60 * 60 * 1000).toString() // Extend by 30 days

      // Make sure to return the session with the address
      return sessionWithAddress
    }
  }
})
