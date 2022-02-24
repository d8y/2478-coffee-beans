import useSWR from 'swr'
import axios, { AxiosResponse } from 'axios'
import { KintoneResponse, Order } from '@/types'
import { OrderListContents } from '@/components/pages/orderList'
import { Title } from '@/components/title'
import { Text } from '@chakra-ui/react'

const fetcher = async (url: string): Promise<KintoneResponse> =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch()

const OrderList = () => {
  const { data, error, isValidating } = useSWR('/api/order', fetcher)

  if (error) {
    return <Text>failed to load</Text>
  }

  if (data === undefined) {
    return <Text>Loading</Text>
  }

  const records: Array<Order> = data?.records

  return (
    <>
      <Title />
      <OrderListContents records={records} />
    </>
  )
}

export default OrderList
