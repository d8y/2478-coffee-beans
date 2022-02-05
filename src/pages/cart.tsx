import {
  Box,
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { PageHeader } from '@/components/pageHeader'
import { cartSelector } from '@/selectors/cart'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { Order } from '@/types'
import { Price } from '@/components/price'
import { Gram } from '@/components/gram'
import axios from 'axios'
import { cartState } from '@/atomes/cartAtom'

const cart = () => {
  const orderList = useRecoilValue(cartSelector)
  const resetOrderState = useResetRecoilState(cartState)
  const toast = useToast()

  const handleClick = async () => {
    if (orderList.length === 0) {
      toast({
        title: 'カートに商品がありません',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
      return
    }

    await axios
      .post('/api/order', orderList)
      .then(() => {
        resetOrderState()
        toast({
          title: '登録しました',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        })
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {})
  }

  return (
    <Box p={4}>
      <PageHeader title={'カート'} />
      <Table variant={'striped'} fontSize={'sm'}>
        <Thead>
          <Tr>
            <Td>受取日</Td>
            <Td>コーヒーNo</Td>
            <Td>商品名</Td>
            <Td>グラム</Td>
            <Td>金額</Td>
            <Td>グラム</Td>
            <Td>ロースト</Td>
          </Tr>
        </Thead>
        <Tbody>
          {orderList.map((record: Order, key) => (
            <Tr key={key}>
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
      <Stack align={'center'} pt={8}>
        <Button onClick={handleClick}>発注追加</Button>
      </Stack>
    </Box>
  )
}

export default cart
