import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import { useColorMode, IconButton } from '@chakra-ui/core'

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      variant="unstyled"
      aria-label="switch color mode"
      icon={colorMode === 'light' ? <FaRegMoon /> : <FaRegSun />}
      onClick={toggleColorMode}
    />
  )
}
