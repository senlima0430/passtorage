import { useRouter } from 'next/router'
import { FiHome, FiPlus, FiSettings } from 'react-icons/fi'
import { Flex, Box, IconButton, useColorMode } from '@chakra-ui/core'

export const Navbar = () => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  const settingsRole = /\/settings(\/\w+)?/g

  return (
    <Box
      borderBottom={
        colorMode === 'light' ? '1px solid black' : '1px solid white'
      }
    >
      <Flex
        mx="auto"
        w="90%"
        maxW={{ lg: '768px', xl: '1024px' }}
        align="center"
        justify="space-between"
      >
        {router.pathname !== '/dashboard' && (
          <IconButton
            variant="unstyled"
            aria-label="home page"
            icon={<FiHome style={{ margin: '0 auto' }} />}
            onClick={() => router.push('/dashboard')}
          />
        )}

        {!router.pathname.match(settingsRole) && (
          <IconButton
            variant="unstyled"
            aria-label="setting"
            icon={<FiSettings style={{ margin: '0 auto' }} />}
            onClick={() => router.push('/settings')}
          />
        )}

        {router.pathname !== '/add' && (
          <IconButton
            variant="unstyled"
            aria-label="add item"
            icon={<FiPlus style={{ margin: '0 auto' }} />}
            onClick={() => router.push('/add')}
          />
        )}
      </Flex>
    </Box>
  )
}
