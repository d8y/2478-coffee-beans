import PageHeader from '@/components/pageHeader'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Gram from '@/components/gram'
import Price from '@/components/price'
import OrderDialog from '@/components/orderDialog'
import React from 'react'
import { Master } from '@/types'

type Props = {
  records: Array<Master>
}

const MasterListContents = ({ records }: Props) => {
  const pageHeader = 'コーヒー豆マスタ'

  const headers = [
    'コーヒーNo',
    '商品名',
    '量',
    '金額',
    '店主おすすめロースト',
    '',
  ]
  return (
    <>
      <PageHeader title={pageHeader} />
      <Box>
        <Table variant="striped" fontSize="sm">
          <Thead>
            <Tr>
              {headers.map((header, key) => (
                <Th key={key}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record: Master) => (
              <Tr key={record.id.value}>
                <Td>{record.coffee_no.value}</Td>
                <Td>{record.product_name.value}</Td>
                <Td>
                  <Gram gram={record.grams.value} />
                </Td>
                <Td>
                  <Price price={record.price.value} />
                </Td>
                <Td>{record.roast.value}</Td>
                <Td>
                  <OrderDialog record={record} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default MasterListContents