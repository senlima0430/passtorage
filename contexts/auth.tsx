import { FC, createContext, useState, useEffect, useContext } from 'react'

type AuthType = {
  status: boolean
  user?: Record<string, any>
}

type ContextValsType = {
  auth: AuthType
  setAuth: (auth: AuthType) => void
  loading: boolean
}

export const AuthContext = createContext<ContextValsType>({
  auth: { status: false },
  setAuth: _auth => console.warn('no auth provider'),
  loading: true,
})

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoad] = useState<boolean>(true)
  const [auth, setAuth] = useState<AuthType>({
    status: false,
    user: undefined,
  })

  useEffect(() => {
    setLoad(true)
    fetch('/api/auth/verify')
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then(info => {
        setAuth({
          status: true,
          user: {
            id: info.data.id,
            name: info.data.name,
          },
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoad(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

import { useRouter } from 'next/router'

export const useRequireLogin = () => {
  const router = useRouter()
  const { auth, loading } = useContext(AuthContext)

  useEffect(() => {
    if (!loading && !auth.status) {
      router.push('/login')
    }
  }, [loading])

  return { user: auth.user, loading }
}
