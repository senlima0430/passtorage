import { FC } from 'react'
import { Flex, Heading } from '@chakra-ui/core'

import { DashboardLayout } from 'components/layouts/Dashboard'
import { AddItemForm } from 'components/item/AddForm'

const Add: FC = () => {
  return (
    <DashboardLayout>
      <Heading size="lg" my="2.5vh">
        Add item
      </Heading>
      <Flex w="100%" justify="center">
        <AddItemForm />
      </Flex>
    </DashboardLayout>
  )
}

export default Add
