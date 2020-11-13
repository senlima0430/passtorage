import { FC } from 'react'
import { Heading } from '@chakra-ui/core'

import { UpdateAccountForm } from 'components/forms/UpdateAccount'
import { DashboardLayout } from 'components/layouts/Dashboard'

const User: FC = () => {
  return (
    <DashboardLayout>
      <Heading size="lg" my="2.5vh">
        Update password
      </Heading>
      <UpdateAccountForm />
    </DashboardLayout>
  )
}

export default User
