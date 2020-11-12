import { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import { FiGrid } from 'react-icons/fi'
import { Box, Flex, VStack, IconButton } from '@chakra-ui/core'

import { AuthContext } from 'contexts/auth'
import { UserButton } from 'components/settings/UserButton'
import { LogoutButton } from 'components/settings/LogoutButton'
import { ColorModeButton } from 'components/settings/ColorModeButton'

export const DashboardLayout: FC = ({ children }) => {
  const router = useRouter()
  const { auth, loading } = useContext(AuthContext)

  if (loading) {
    return <p>Loading</p>
  }

  if (!loading && !auth) router.push('/login')

  return (
    <Flex w="100%" h="100vh">
      <VStack
        flex="none"
        w="70px"
        h="100vh"
        pt="5vh"
        spacing="0.5rem"
        background="green.600"
      >
        <IconButton
          aria-label="to home page icon"
          icon={<FiGrid />}
          variant="ghost"
        />
        <ColorModeButton />
        <UserButton />
        <LogoutButton />
      </VStack>
      <Box pos="relative" flex="auto" w="100%" h="100vh">
        {children}
      </Box>
    </Flex>
  )
}
