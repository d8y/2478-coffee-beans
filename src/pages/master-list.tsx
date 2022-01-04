import {
  Box,
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import OrderDialog from '@/components/orderDialog'
import React from 'react'
import Price from '@/components/price'
import Gram from '@/components/gram'
import PageHeader from '@/components/pageHeader'

export default ({ records, totalCount }) => {
  return (
    <Container maxW={'container.xl'} centerContent>
      <Box p={4}>
        <PageHeader title={'2478コーヒー豆マスタ'} />
        <Box>
          <Table variant="striped" fontSize="sm">
            <Thead>
              <Tr>
                <Th>コーヒーNo</Th>
                <Th>商品名</Th>
                <Th>量</Th>
                <Th>金額</Th>
                <Th>店主おすすめロースト</Th>
                <Th>注文</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record: any) => (
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
      </Box>
    </Container>
  )
}

export async function getServerSideProps() {
  const appId = process.env.MASTER_DATA_KINTONE_APP_ID
  if (!appId) {
    throw new Error('kintone app id が設定されていません')
  }

  const client = new KintoneRestAPIClient({
    baseUrl: process.env.KINTONE_END_POINT,
    auth: {
      apiToken: process.env.MASTER_DATA_KINTONE_APP_API_TOKEN,
    },
  })

  const result = await client.record.getRecords({
    app: appId,
    totalCount: true,
  })

  return {
    props: result,
  }
}
