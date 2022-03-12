import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ContentsHeader } from '@/components/pages/masterList/orderDialog/ContentsHeader'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartState } from '@/atomes/cartAtom'
import { CartIcon } from '@/components/icons/CartIcons'
import 'dayjs/plugin/isSameOrBefore'
import { CoffeeBean } from '@/generated/graphql'
import { Cart } from '@/types'

const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

dayjs.locale('ja')

type Props = {
  coffeeBean: CoffeeBean
}

type FormInput = {
  count: string
  purchase_order_date: string
  receiving_date: string
  roast: string
}

const getReceivingDateOptions = () => {
  const thisWeekMonday = dayjs().day(1)
  const nextMonth = dayjs().add(1, 'month')

  let receivingDateOptions = []
  let i = 0
  while (thisWeekMonday.add(i, 'week').isSameOrBefore(nextMonth, 'month')) {
    const p = thisWeekMonday.add(i, 'week')
    if (p.isSame(nextMonth, 'month')) {
      receivingDateOptions.push(
        thisWeekMonday.add(i, 'week').format('YYYY-MM-DD')
      )
    }
    i += 2
  }
  return receivingDateOptions
}

export const OrderDialog: FC<Props> = ({ coffeeBean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>()
  const cartList = useRecoilValue(cartState)
  const setOrderList = useSetRecoilState(cartState)
  const toast = useToast()

  const formatToday = dayjs().format('YYYY-MM-DD')
  const receivingDateOptions = getReceivingDateOptions()

  const onSubmit = handleSubmit((input: FormInput) => {
    const post: Cart = {
      purchase_order_date: String(input.purchase_order_date),
      receiving_date: String(input.receiving_date),
      coffee_no: String(coffeeBean.coffee_no),
      product_name: String(coffeeBean.product_name),
      count: Number(1),
      price: Number(coffeeBean.price),
      grams: Number(coffeeBean.grams),
      roast: Number(input.roast),
      coffee_bean_id: Number(coffeeBean.id),
    }

    const set = cartList.length === 0 ? [post] : [...cartList, post]

    setOrderList(set)
    toast({
      title: 'カートに追加しました',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    })
    onClose()
  })

  return (
    <>
      <CartIcon onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'lg'}
        motionPreset={'slideInBottom'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>注文追加</ModalHeader>
            <ModalCloseButton />
            <Text pl={6}>以下の内容で追加します</Text>
            <ModalBody>
              <Box>
                <ContentsHeader coffeeBean={coffeeBean} />
                <Divider py={3} />
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.purchase_order_date)}>
                    <FormLabel>発注日</FormLabel>
                    <Input
                      id={'purchase_order_date'}
                      type={'date'}
                      size="md"
                      value={formatToday}
                      isReadOnly={true}
                      {...register('purchase_order_date', {
                        required: '必須項目です',
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.purchase_order_date?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.receiving_date)}>
                    <FormLabel>受取日</FormLabel>
                    <Select
                      {...register('receiving_date', {
                        required: '必須項目です',
                      })}
                    >
                      {receivingDateOptions.map((value, key) => (
                        <option key={key} value={value}>
                          {value}
                        </option>
                      ))}
                    </Select>

                    <FormErrorMessage>
                      {errors?.receiving_date?.message}
                      {errors?.receiving_date?.type === 'month' && (
                        <p>受取日は発注月の翌月から選択してください</p>
                      )}
                      {errors?.receiving_date?.type === 'day' && (
                        <p>受取日は月曜日を選択してください</p>
                      )}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.count)}>
                    <FormLabel>個数</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
                      defaultValue={1}
                      placeholder="個数を入力してください"
                      {...register('count', {
                        required: '必須項目です',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.count && errors.count.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.roast)}>
                    <FormLabel>ロースト</FormLabel>
                    <NumberInput
                      defaultValue={coffeeBean.roast}
                      min={1}
                      max={6}
                    >
                      <NumberInputField
                        {...register('roast', {
                          required: '必須項目です',
                          min: {
                            value: 1,
                            message: '1から6のローストを選択してください',
                          },
                          max: {
                            value: 6,
                            message: '1から6のローストを選択してください',
                          },
                        })}
                      />
                      <NumberInputStepper>
                        <NumberDecrementStepper />
                        <NumberIncrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>
                      {errors.roast && errors.roast.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                カートに追加
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
