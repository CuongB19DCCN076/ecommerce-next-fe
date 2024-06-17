/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** auth
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

// ** hooks
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  // ** hook
  const authContext = useAuth();

  // ** next
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (authContext.loading) {
    return fallback;
  }

  return <>{children}</>
}

export default GuestGuard
