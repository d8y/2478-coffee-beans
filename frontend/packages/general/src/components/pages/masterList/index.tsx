import { PageHeader } from '@/components/ui/PageHeader'
import { Box, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { Gram } from '@/components/ui/Gram'
import { Price } from '@/components/ui/Price'
import { OrderDialog } from '@/components/pages/masterList/orderDialog'
import React from 'react'
import { CoffeeBean, useCoffeeBeansQuery } from '@/generated/graphql'
import { TableHeader } from '@/components/ui/TableHeader'

export const MasterListContents = () => {
  const title = '商品一覧'

  const headers = [
    'コーヒーNo',
    '商品名',
    '量',
    '金額',
    '店主おすすめロースト',
    '',
  ]

  const { data } = useCoffeeBeansQuery()

  return (
    <>
      <Box p={4}>
        <PageHeader title={title} />
        <Box>
          <Table variant="striped" fontSize="sm">
            <TableHeader headers={headers} />
            <Tbody>
              {data?.coffeeBeans?.map((coffeeBean: CoffeeBean) => (
                <Tr key={coffeeBean.id}>
                  <Td isNumeric>{coffeeBean.coffee_no}</Td>
                  <Td>{coffeeBean.product_name}</Td>
                  <Td isNumeric>
                    <Gram gram={coffeeBean.grams} />
                  </Td>
                  <Td isNumeric>
                    <Price price={coffeeBean.price} />
                  </Td>
                  <Td isNumeric>{coffeeBean.roast}</Td>
                  <Td>
                    <OrderDialog coffeeBean={coffeeBean} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  )
}
