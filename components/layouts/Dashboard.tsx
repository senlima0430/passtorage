import { FC } from 'react'
import { Box } from '@chakra-ui/core'

import { useRequireLogin } from 'contexts/auth'
import { Navbar } from 'components/common/Navbar'

export const DashboardLayout: FC = ({ children }) => {
  const { loading } = useRequireLogin()

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <Box
        as="main"
        pos="relative"
        mx="auto"
        w="90%"
        maxW={{ lg: '768px', xl: '1024px' }}
      >
        {children}
      </Box>
    </>
  )
}
