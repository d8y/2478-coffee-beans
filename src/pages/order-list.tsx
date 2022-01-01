import {
  Box,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import useSWR from 'swr'
import axios, { AxiosResponse } from 'axios'
import { KintoneResponse, Order } from '@/types'
import Price from '@/components/price'
import Gram from '@/components/gram'

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
      <Box>
        <Text color={'blue'} align={'center'} fontSize={'5xl'}>
          2478
        </Text>
        <Box>
          <Table variant={'striped'} fontSize={'sm'}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>発注日</Th>
                <Th>受取日</Th>
                <Th>コーヒーNo</Th>
                <Th>商品名</Th>
                <Th>個数</Th>
                <Th>金額</Th>
                <Th>量</Th>
                <Th>ロースト</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record: Order) => (
                <Tr key={record.id.value}>
                  <Td>{record.id.value}</Td>
                  <Td>{record.purchase_order_date.value}</Td>
                  <Td>{record.receiving_date.value}</Td>
                  <Td>{record.coffee_no.value}</Td>
                  <Td>{record.product_name.value}</Td>
                  <Td>{record.count.value}</Td>
                  <Td>
                    <Price price={record.price.value} />
                  </Td>
                  <Td>
                    <Gram gram={record.grams.value} />
                  </Td>
                  <Td>{record.roast.value}</Td>
                  <Td></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  )
}

export default orderList
