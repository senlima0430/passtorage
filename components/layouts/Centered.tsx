import { FC } from 'react'
import { VStack } from '@chakra-ui/core'

export const CenteredLayout: FC = ({ children }) => {
  return (
    <VStack w="100%" h="100vh" align="center" justify="center">
      {children}
    </VStack>
  )
}
