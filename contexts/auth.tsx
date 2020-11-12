import { createContext, useState, FC, useEffect } from 'react'

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
        console.log(info)
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
