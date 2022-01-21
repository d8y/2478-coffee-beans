import { PageHeader } from '@/components/pageHeader'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Order } from '@/types'
import { Price } from '@/components/price'
import { Gram } from '@/components/gram'

type Props = {
  records: Array<Order>
}

export const OrderListContents = ({ records }: Props) => {
  const title = '2478コーヒー豆発注リスト'

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
                  <Td>{record.purchase_order_date.value}</Td>
                  <Td>{record.receiving_date.value}</Td>
                  <Td isNumeric>{record.coffee_no.value}</Td>
                  <Td>{record.product_name.value}</Td>
                  <Td isNumeric>{record.count.value}</Td>
                  <Td isNumeric>
                    <Price price={record.price.value} />
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
