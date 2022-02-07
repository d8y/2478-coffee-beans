import {
  Box,
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { PageHeader } from '@/components/pageHeader'
import { cartSelector } from '@/selectors/cart'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { Cart } from '@/types'
import { Price } from '@/components/price'
import { Gram } from '@/components/gram'
import axios from 'axios'
import { cartState } from '@/atomes/cartAtom'
import { Title } from '@/components/title'

const pageHeader = 'カート'
const noItemsExplanation = 'カートに商品がありません'
const headers = [
  '受取日',
  'コーヒーNo',
  '商品名',
  '数量',
  '金額',
  'グラム',
  'ロースト',
]

const Cart = () => {
  const cartList = useRecoilValue(cartSelector)
  const resetOrderState = useResetRecoilState(cartState)
  const toast = useToast()

  if (cartList.length === 0) {
    return (
      <Box p={4}>
        <div>{noItemsExplanation}</div>
      </Box>
    )
  }

  const handleClick = async () => {
    if (cartList.length === 0) {
      toast({
        title: noItemsExplanation,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
      return
    }

    await axios
      .post('/api/order', cartList)
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
      <Title />
      <PageHeader title={pageHeader} />
      <Table variant={'striped'} fontSize={'sm'}>
        <Thead>
          <Tr>
            {headers.map((header, key) => (
              <Th key={key}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {cartList.map((record: Cart, key) => (
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

export default Cart
