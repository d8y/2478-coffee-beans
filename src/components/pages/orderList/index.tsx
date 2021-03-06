import { PageHeader } from '@/components/ui/PageHeader'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Order } from '@/types'
import { Price } from '@/components/ui/Price'
import { Gram } from '@/components/ui/Gram'
import dayjs from 'dayjs'
import { Date } from '@/components/pages/orderList/Date'

type Props = {
  records: Array<Order>
}

export const OrderListContents = ({ records }: Props) => {
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

  return (
    <>
      <Box p={4}>
        <PageHeader title={title} />
        <Box>
          <Table variant={'striped'} fontSize={'sm'}>
            <Thead>
              <Tr>
                {headers.map((header, key) => (
                  <Th key={key}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record: Order) => (
                <Tr key={record.id.value}>
                  <Td isNumeric>{record.id.value}</Td>
                  <Td>
                    <Date date={dayjs(record.purchase_order_date.value)} />
                  </Td>
                  <Td>
                    <Date date={dayjs(record.receiving_date.value)} />
                  </Td>
                  <Td isNumeric>{record.coffee_no.value}</Td>
                  <Td>{record.product_name.value}</Td>
                  <Td isNumeric>{record.count.value}</Td>
                  <Td isNumeric>
                    <Price price={Number(record.price.value)} />
                  </Td>
                  <Td isNumeric>
                    <Gram gram={record.grams.value} />
                  </Td>
                  <Td isNumeric>{record.roast.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  )
}
