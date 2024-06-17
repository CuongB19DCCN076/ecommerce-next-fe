/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** auth
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

// ** hooks
import { useAuth } from 'src/hooks/useAuth'

// ** helper
import { clearLocalUserData } from 'src/helpers/store'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props

  // hooks
  const authContext = useAuth();

  // next-router 
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (authContext.user === null && !window.localStorage.getItem(ACCESS_TOKEN) && !window.localStorage.getItem(USER_DATA)) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: {
            returnUrl: router.asPath
          }
        })
      } else {
        router.replace('/login')
      }
      authContext.setUser(null);
      clearLocalUserData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  // if (authContext.loading || authContext.user === null) {
  //   return fallback;
  // }

  return <>{children}</>
}

export default AuthGuard
