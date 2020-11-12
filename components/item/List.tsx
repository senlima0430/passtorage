import { FC, useEffect } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { VStack, Flex, Heading, IconButton } from '@chakra-ui/core'

import { useGetItems } from 'api/item'
import { SecretItem } from './Secret'

export const ItemList: FC = () => {
  const { data, error, mutate, isLoading } = useGetItems()

  useEffect(() => {
    console.log(data)
  }, [data])

  if (isLoading) {
    return <div>Loading items...</div>
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
        {data?.data.map(item => (
          <SecretItem key={item.id} item={item} />
        ))}
      </VStack>
    </>
  )
}
