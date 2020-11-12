import { FC } from 'react'

import { ItemList } from 'components/item/List'
import { DashboardLayout } from 'components/layouts/Dashboard'

const Dashboard: FC = () => {
  return (
    <DashboardLayout>
      <ItemList />
    </DashboardLayout>
  )
}

export default Dashboard
