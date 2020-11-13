import { FC } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import {
  Text,
  Flex,
  VStack,
  Center,
  Heading,
  Spinner,
  IconButton,
} from '@chakra-ui/core'

import { useGetItems } from 'api/item'
import { SecretItem } from './Secret'

export const ItemList: FC = () => {
  const { data, error, mutate, isLoading } = useGetItems()

  const deleteItem = async (id: string) => {
    const res = await fetch(`/api/item/delete/${id}`, {
      method: 'DELETE',
    })
    const data = (await res.json()) as Record<string, any>
    console.log(data)
    if (data.ok) {
      await mutate()
    }
  }

  if (isLoading) {
    return (
      <Center w="100%" h="5vh">
        <Spinner size="lg" />
      </Center>
    )
  }

  if (error) return <p>Error occurred</p>

  return (
    <>
      <Flex py="1rem" px="0.5rem" align="center" justify="space-between">
        <Heading size="lg">List</Heading>
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="refresh"
          icon={<FiRefreshCw style={{ margin: '0 auto' }} />}
          onClick={() => mutate()}
        />
      </Flex>
      <VStack my="2.5vh" spacing="0.5rem">
        {data?.data.length === 0 && (
          <Center w="100%" h="5vh">
            <Text>Go to storage a new item</Text>
          </Center>
        )}
        {data?.data.map(item => (
          <SecretItem
            key={item.id}
            item={item}
            deleteFunc={() => deleteItem(item.id)}
          />
        ))}
      </VStack>
    </>
  )
}
