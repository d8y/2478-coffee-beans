import { PageHeader } from '@/components/ui/PageHeader'
import { Box, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { Price } from '@/components/ui/Price'
import { Gram } from '@/components/ui/Gram'
import dayjs from 'dayjs'
import { Date } from '@/components/pages/orderList/Date'
import { Order, useOrdersQuery } from '@/generated/graphql'
import { TableHeader } from '@/components/ui/TableHeader'

export const OrderListContents = () => {
  const title = '発注履歴'

  const headers = [
    'No',
    '発注日',
    '受取日',
    'コーヒーNo',
    '商品名',
    '個数',
    '金額',
    '量',
    'ロースト',
  ]

  const { data } = useOrdersQuery()

  return (
    <>
      <Box p={4}>
        <PageHeader title={title} />
        <Box>
          <Table variant={'striped'} fontSize={'sm'}>
            <TableHeader headers={headers} />
            <Tbody>
              {data?.orders?.map((order: Order) => (
                <Tr key={order.id}>
                  <Td isNumeric>{order.id}</Td>
                  <Td>
                    <Date date={dayjs(order.purchase_order_date)} />
                  </Td>
                  <Td>
                    <Date date={dayjs(order.receiving_date)} />
                  </Td>
                  <Td isNumeric>{order.coffeeBean.coffee_no}</Td>
                  <Td>{order.coffeeBean.product_name}</Td>
                  <Td isNumeric>{order.count}</Td>
                  <Td isNumeric>
                    <Price price={Number(order.price)} />
                  </Td>
                  <Td isNumeric>
                    <Gram gram={order.grams} />
                  </Td>
                  <Td isNumeric>{order.roast}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  )
}
