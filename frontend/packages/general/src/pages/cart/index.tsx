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
import { Title } from '@/components/title'
import { PageHeader } from '@/components/ui/PageHeader'
import {
  MutationCreateOrderArgs,
  useCreateOrdersMutation,
} from '@/generated/graphql'
import { Price } from '@/components/ui/Price'
import { Gram } from '@/components/ui/Gram'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartSelector } from '@/selectors/cart'
import { Cart } from '@/types'
import { cartState } from '@/atomes/cartAtom'

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

export const Cart = () => {
  const clearCartList = useSetRecoilState(cartState)
  const cartList: Array<Cart> = useRecoilValue(cartSelector)
  const toast = useToast()

  const [createOrdersMutation, { data, loading, error }] =
    useCreateOrdersMutation()

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

    const inputData: Array<MutationCreateOrderArgs> = cartList.map(
      (cart: Cart) => ({
        coffee_bean_id: cart.coffee_bean_id,
        count: cart.count,
        grams: cart.grams,
        price: cart.price,
        purchase_order_date: cart.purchase_order_date,
        receiving_date: cart.receiving_date,
        roast: cart.roast,
      })
    )

    createOrdersMutation({ variables: { input: inputData } })

    if (error) {
      toast({
        title: '発注履歴に登録しました',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    } else {
      clearCartList([])
      toast({
        title: '発注履歴に登録しました',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    }
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
          {cartList.map((cart: Cart, key) => (
            <Tr key={key}>
              <Td>{cart.receiving_date}</Td>
              <Td isNumeric>{cart.coffee_no}</Td>
              <Td>{cart.product_name}</Td>
              <Td isNumeric>{cart.count}</Td>
              <Td isNumeric>
                <Price price={cart.price} />
              </Td>
              <Td isNumeric>
                <Gram gram={cart.grams} />
              </Td>
              <Td isNumeric>{cart.roast}</Td>
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
