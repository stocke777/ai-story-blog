'use client'
import { SessionProvider } from "next-auth/react"

type Props = any

const context = ({children, session}: Props) => {
    return (
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      )
}

export default context