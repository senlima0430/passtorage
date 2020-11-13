import { FC, useState } from 'react'
import { FiX, FiCopy, FiEdit2, FiTrash } from 'react-icons/fi'
import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  useClipboard,
  useColorMode,
} from '@chakra-ui/core'

import { ItemType } from 'interfaces'

type Props = {
  item: ItemType
  deleteFunc: () => Promise<void>
}

export const SecretItem: FC<Props> = ({ item, deleteFunc }) => {
  const { colorMode } = useColorMode()
  const [isEdit, setEdit] = useState(false)
  const { onCopy } = useClipboard(item.content)

  return (
    <Box
      pos="relative"
      w="100%"
      p="1rem"
      border={colorMode === 'light' ? '1px solid black' : '1px solid white'}
      borderRadius="12px"
    >
      <HStack spacing="0.5em" pos="absolute" top="1rem" right="1rem">
        {isEdit && (
          <IconButton
            size="sm"
            variant="unstyled"
            aria-label="cancel"
            icon={<FiX style={{ margin: '0 auto' }} />}
            onClick={() => setEdit(false)}
          />
        )}
        {!isEdit && (
          <>
            <IconButton
              size="sm"
              variant="unstyled"
              aria-label="copy"
              icon={<FiCopy style={{ margin: '0 auto' }} />}
              onClick={onCopy}
            />
            <IconButton
              size="sm"
              variant="unstyled"
              aria-label="edit"
              icon={<FiEdit2 style={{ margin: '0 auto' }} />}
              onClick={() => setEdit(true)}
            />
            <IconButton
              size="sm"
              variant="unstyled"
              aria-label="trash"
              icon={<FiTrash style={{ margin: '0 auto' }} />}
              onClick={() => deleteFunc()}
            />
          </>
        )}
      </HStack>

      <Heading size="sm" h="32px" lineHeight="32px">
        {item.name}
      </Heading>
      {item.description && <Text noOfLines={1}>{item.description}</Text>}
    </Box>
  )
}
