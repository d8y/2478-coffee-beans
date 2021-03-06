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
import { ContentsHeader } from '@/components/pages/masterList/orderDialog/contentsHeader'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { Cart, Master } from '@/types'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartState } from '@/atomes/cartAtom'
import { CartIcon } from '@/components/icons/CartIcons'
import 'dayjs/plugin/isSameOrBefore'

const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

dayjs.locale('ja')

type Props = {
  record: Master
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

export const OrderDialog: FC<Props> = ({ record }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>()
  const cart = useRecoilValue(cartState)
  const setOrderList = useSetRecoilState(cartState)
  const toast = useToast()

  const formatToday = dayjs().format('YYYY-MM-DD')
  const receivingDateOptions = getReceivingDateOptions()

  const onSubmit = handleSubmit((data: FormInput) => {
    const post: Cart = {
      purchase_order_date: { value: String(data.purchase_order_date) },
      receiving_date: { value: String(data.receiving_date) },
      coffee_no: { value: record.coffee_no.value },
      product_name: { value: record.product_name.value },
      count: { value: Number(data.count) },
      price: { value: Number(record.price.value) },
      grams: { value: record.grams.value },
      roast: { value: Number(data.roast) },
      master_id: { value: record.id.value },
    }

    setOrderList([...cart, post])
    toast({
      title: '??????????????????????????????',
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
            <ModalHeader>????????????</ModalHeader>
            <ModalCloseButton />
            <Text pl={6}>?????????????????????????????????</Text>
            <ModalBody>
              <Box>
                <ContentsHeader record={record} />
                <Divider py={3} />
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.purchase_order_date)}>
                    <FormLabel>?????????</FormLabel>
                    <Input
                      id={'purchase_order_date'}
                      type={'date'}
                      size="md"
                      value={formatToday}
                      isReadOnly={true}
                      {...register('purchase_order_date', {
                        required: '??????????????????',
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.purchase_order_date?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.receiving_date)}>
                    <FormLabel>?????????</FormLabel>
                    <Select
                      {...register('receiving_date', {
                        required: '??????????????????',
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
                        <p>????????????????????????????????????????????????????????????</p>
                      )}
                      {errors?.receiving_date?.type === 'day' && (
                        <p>????????????????????????????????????????????????</p>
                      )}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.count)}>
                    <FormLabel>??????</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
                      defaultValue={1}
                      placeholder="?????????????????????????????????"
                      {...register('count', {
                        required: '??????????????????',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.count && errors.count.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={Boolean(errors.roast)}>
                    <FormLabel>????????????</FormLabel>
                    <NumberInput
                      defaultValue={record.roast.value}
                      min={1}
                      max={6}
                    >
                      <NumberInputField
                        {...register('roast', {
                          required: '??????????????????',
                          min: {
                            value: 1,
                            message: '1??????6??????????????????????????????????????????',
                          },
                          max: {
                            value: 6,
                            message: '1??????6??????????????????????????????????????????',
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
                ??????????????????
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
