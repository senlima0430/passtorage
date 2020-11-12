import { FC } from 'react'
import { Flex } from '@chakra-ui/core'

import { DashboardLayout } from 'components/layouts/Dashboard'
import { AddItemForm } from 'components/item/AddForm'

const Add: FC = () => {
  return (
    <DashboardLayout>
      <Flex w="100%" justify="center">
        <AddItemForm />
      </Flex>
    </DashboardLayout>
  )
}

export default Add
