import { FC } from 'react'
import { useRouter } from 'next/router'
import { FiChevronRight } from 'react-icons/fi'
import {
  Text,
  Flex,
  Button,
  VStack,
  Switch,
  Heading,
  useColorMode,
} from '@chakra-ui/core'

import { DashboardLayout } from 'components/layouts/Dashboard'

const Settings: FC = () => {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <DashboardLayout>
      <Heading size="lg" my="2.5vh">
        Settings
      </Heading>
      <VStack align="stretch" spacing="1rem">
        <Flex h="40px" align="center" justify="space-between">
          <Text lineHeight="40px">暗色模式</Text>
          <Switch
            colorScheme="green"
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
          />
        </Flex>
        <Button
          d="flex"
          w="100%"
          h="40px"
          alignItems="center"
          justifyContent="space-between"
          rightIcon={<FiChevronRight style={{ fontSize: '20px' }} />}
          onClick={() => router.push('/settings/user')}
        >
          更改帳號
        </Button>
        <Button
          d="flex"
          w="100%"
          h="40px"
          alignItems="center"
          justifyContent="space-between"
          rightIcon={<FiChevronRight style={{ fontSize: '20px' }} />}
        >
          關於
        </Button>
        <Button d="flex" w="100%" h="40px">
          <Text color="red.500" lineHeight="40px">
            登出
          </Text>
        </Button>
      </VStack>
    </DashboardLayout>
  )
}

export default Settings
