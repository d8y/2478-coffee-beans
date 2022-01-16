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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import ContentsHeader from '@/components/orderDialog/contentsHeader'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { Master } from '@/types'

dayjs.locale('ja')

type Props = {
  record: Master
}

const Index: FC<Props> = ({ record }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const today = dayjs().format('YYYY-MM-DD')

  async function onSubmit(values) {
    console.log('onSubmit')
    console.log({ ...record, ...values })

    const post = {
      purchase_order_date: { value: values.purchase_order_date },
      receiving_date: { value: values.receiving_date },
      coffee_no: { value: record.coffee_no.value },
      product_name: { value: record.product_name.value },
      count: { value: values.count },
      price: { value: record.price.value },
      grams: { value: record.grams.value },
      roast: { value: values.roast },
    }

    await axios
      .post('/api/order', post)
      .then(() => {
        console.log('done')
      })
      .finally(() => {
        onClose()
      })
  }

  return (
    <>
      <Button colorScheme={'blue'} onClick={onOpen}>
        発注入力
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'lg'}
        motionPreset={'slideInBottom'}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>注文追加</ModalHeader>
            <ModalCloseButton />
            <Text pl={6}>以下の内容で追加します</Text>
            <ModalBody>
              <Box>
                <ContentsHeader record={record} />
                <Divider py={3} />
                <Box py={2}>
                  <FormControl isInvalid={errors.purchase_order_date}>
                    <FormLabel>発注日</FormLabel>
                    <Input
                      id={'purchase_order_date'}
                      type={'date'}
                      size="md"
                      value={today}
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
                  <FormControl isInvalid={errors.receiving_date}>
                    <FormLabel>受取日</FormLabel>
                    <Input
                      id={'receiving_date'}
                      type={'date'}
                      size="md"
                      {...register('receiving_date', {
                        required: '必須項目です',
                        validate: {
                          month: (value) =>
                            dayjs()
                              .add(1, 'month')
                              .isSame(dayjs(value), 'month'),
                          day: (value) => dayjs(value).get('day') === 1,
                        },
                      })}
                    />
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
                  <FormControl isInvalid={errors.count}>
                    <FormLabel>個数</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
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
                  <FormControl isInvalid={errors.roast}>
                    <FormLabel>ロースト</FormLabel>
                    <NumberInput
                      defaultValue={record.roast.value}
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
                発注追加
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
export default Index
