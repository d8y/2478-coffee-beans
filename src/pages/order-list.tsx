import { Box, Container, HStack } from '@chakra-ui/react'
import useSWR from 'swr'
import axios, { AxiosResponse } from 'axios'
import { KintoneResponse, Order } from '@/types'
import { OrderListContents } from '@/components/orderListContents'
import { DrawerMenu } from '@/components/drawerMenu'

const fetcher = async (url: string): Promise<KintoneResponse> =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch()

const orderList = () => {
  const { data, error, isValidating } = useSWR('/api/order', fetcher)

  if (error) {
    return <div>failed to load</div>
  }

  if (data === undefined) {
    return <div>loading</div>
  }

  const records: Array<Order> = data?.records

  return (
    <Container maxW={'container.xl'} centerContent>
      <HStack align={'top'}>
        <Box p={4} position={'fixed'} left={0}>
          <DrawerMenu />
        </Box>
        <Box p={4}>
          <OrderListContents records={records} />
        </Box>
      </HStack>
    </Container>
  )
}

export default orderList
