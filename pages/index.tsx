import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'

import { getToken } from 'utils/token'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userCount = await prisma.users.count()
  const token = await getToken(req)

  return {
    props: {
      userCount,
      loggedIn: Boolean(token),
    },
  }
}

import { FC } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/core'

import { CenteredLayout } from 'components/layouts/Centered'
import { CreateAccountForm } from 'components/forms/CreateAccount'

type Props = {
  userCount: number
  loggedIn: boolean
}

const Index: FC<Props> = ({ userCount, loggedIn }) => {
  const router = useRouter()

  if (typeof window !== 'undefined' && userCount > 0) {
    router.push(loggedIn ? '/dashboard' : '/login')
  }

  return (
    <CenteredLayout>
      {userCount === 0 ? (
        <>
          <Heading size="md">Setup admin</Heading>
          <CreateAccountForm />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </CenteredLayout>
  )
}

export default Index
