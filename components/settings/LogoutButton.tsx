import { useContext } from 'react'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'
import {
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
      <IconButton
        aria-label="logout"
        icon={<FiLogOut />}
        variant="ghost"
        onClick={onOpen}
      />
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
