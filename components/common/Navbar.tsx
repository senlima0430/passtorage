import { useRouter } from 'next/router'
import { Flex, Box, IconButton } from '@chakra-ui/core'
import { FiHome, FiPlus, FiSettings } from 'react-icons/fi'

export const Navbar = () => {
  const router = useRouter()

  return (
    <Box borderBottom="1px solid black">
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
            aria-label="add item"
            icon={<FiHome style={{ margin: '0 auto' }} />}
            onClick={() => router.push('/dashboard')}
          />
        )}

        {router.pathname !== '/settings' && (
          <IconButton
            variant="unstyled"
            aria-label="add item"
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
