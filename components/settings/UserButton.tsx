import { useRouter } from 'next/router'
import { FaRegUserCircle } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/core'

export function UserButton() {
  const router = useRouter()

  return (
    <IconButton
      variant="unstyled"
      aria-label="to user page"
      icon={<FaRegUserCircle />}
      onClick={() => router.push('/user')}
    />
  )
}
