import { FC } from 'react'

import { LoginForm } from 'components/forms/Login'
import { CenteredLayout } from 'components/layouts/Centered'

const Login: FC = () => {
  return (
    <CenteredLayout>
      <LoginForm />
    </CenteredLayout>
  )
}

export default Login
