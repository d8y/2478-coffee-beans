import useSWR from 'swr'
import axios, { AxiosResponse } from 'axios'
import { KintoneResponse, Order } from '@/types'
import { OrderListContents } from '@/components/orderListContents'

const fetcher = async (url: string): Promise<KintoneResponse> =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch()

const OrderList = () => {
  const { data, error, isValidating } = useSWR('/api/order', fetcher)

  if (error) {
    return <div>failed to load</div>
  }

  if (data === undefined) {
    return <div>loading</div>
  }

  const records: Array<Order> = data?.records

  return <OrderListContents records={records} />
}

export default OrderList
