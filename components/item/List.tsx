import { FC, useEffect } from 'react'
import { VStack } from '@chakra-ui/core'

import { useGetItems } from 'api/item'
import { SecretItem } from './Secret'

export const ItemList: FC = () => {
  const { data, error, isLoading } = useGetItems()

  useEffect(() => {
    console.log(data)
  }, [data])

  if (isLoading) {
    return <div>Loading items...</div>
  }

  if (error) return <p>Error occurred</p>

  return (
    <VStack my="2.5vh" spacing="0.5rem">
      {data?.data.map(item => (
        <SecretItem key={item.id} item={item} />
      ))}
    </VStack>
  )
}
