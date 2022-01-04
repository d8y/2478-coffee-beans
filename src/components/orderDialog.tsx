import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
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
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Price from '@/components/price'

type Props = {
  record: object
}

const OrderDialog: FC<Props> = ({ record }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

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
        注文入力
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'lg'}
        motionPreset={'slideInBottom'}
        scrollBehavior={'inside'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>注文追加</ModalHeader>
            <ModalCloseButton />
            <Text pl={6}>以下の内容で追加します</Text>
            <ModalBody>
              <Box>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  px="6"
                  py="4"
                  _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
                  {...FlexProps}
                >
                  <Box as={'dt'} minWidth="180px">
                    コーヒーNo
                  </Box>
                  <Spacer />
                  <Box as={'dd'} fontWeight={'semibold'}>
                    {record.coffee_no.value}
                  </Box>
                </Flex>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  px="6"
                  py="4"
                  _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
                  {...FlexProps}
                >
                  <Box as={'dt'} minWidth="180px">
                    商品名
                  </Box>
                  <Spacer />
                  <Box as={'dd'} fontWeight={'semibold'}>
                    {record.product_name.value}
                  </Box>
                </Flex>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  px="6"
                  py="4"
                  _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
                  {...FlexProps}
                >
                  <Box as={'dt'} minWidth="180px">
                    グラム
                  </Box>
                  <Spacer />
                  <Box as={'dd'} fontWeight={'semibold'}>
                    {record.grams.value}g
                  </Box>
                </Flex>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  px="6"
                  py="4"
                  _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
                  {...FlexProps}
                >
                  <Box as={'dt'} minWidth="180px">
                    金額
                  </Box>
                  <Spacer />
                  <Box as={'dd'} fontWeight={'semibold'}>
                    <Price price={record.price.value} />
                  </Box>
                </Flex>
                <Divider py={3} />
                <Box py={2}>
                  <FormControl isInvalid={errors.purchase_order_date}>
                    <FormLabel>発注日</FormLabel>
                    <Input
                      id={'purchase_order_date'}
                      type={'date'}
                      size="md"
                      {...register('purchase_order_date', {
                        required: '必須項目です',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.purchase_order_date &&
                        errors.purchase_order_date.message}
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
                      })}
                    />
                    <FormErrorMessage>
                      {errors.receiving_date && errors.receiving_date.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isInvalid={errors.count}>
                    <FormLabel>個数</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
                      placeholder="個数"
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
                    <Input
                      type={'Number'}
                      size="md"
                      placeholder="ロースト"
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
export default OrderDialog
