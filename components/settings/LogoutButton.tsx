import { useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core'

import { AuthContext } from 'contexts/auth'

export function LogoutButton() {
  const router = useRouter()
  const { setAuth } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logout = async () => {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200) {
      setAuth({
        status: false,
        user: undefined,
      })
      onClose()
      router.push('/login')
    }
  }

  return (
    <>
      <Button d="flex" w="100%" h="40px" onClick={onOpen}>
        <Text color="red.500" lineHeight="40px">
          Logout
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Want to logout?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You will sign out the system
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={logout}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
