import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async () => {
  const userCount = await prisma.users.count()
  console.log(userCount)
  return {
    props: { userCount },
  }
}

import { FC, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/core'

import { AuthContext } from 'contexts/auth'
import { CenteredLayout } from 'components/layouts/Centered'
import { CreateAccountForm } from 'components/forms/CreateAccount'

type Props = {
  userCount: number
}

const Index: FC<Props> = ({ userCount }) => {
  const router = useRouter()
  const { auth, loading } = useContext(AuthContext)

  useEffect(() => {
    if (userCount > 0 && !loading) {
      router.push(auth.status ? '/dashboard' : '/login')
    }
  }, [loading])

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
