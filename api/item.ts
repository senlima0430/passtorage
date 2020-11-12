import useSWR from 'swr'

import { ItemType } from 'interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const baseUrl = 'http://localhost:3000'

type GetItemsResponse = {
  ok: boolean
  data: ItemType[]
}

export const useGetItems = (page = 1, size = 10) => {
  const url = `${baseUrl}/api/item/all?page=${page}&size=${size}`

  const { data, error, mutate } = useSWR<GetItemsResponse>(url, fetcher)

  return { data, error, mutate, isLoading: !error && !data }
}
