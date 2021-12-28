import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
  FormControl,
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
import axios from 'axios'

interface Props {
  record: object
}

const OrderDialog: FC<Props> = ({ record }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onAdd = async () => {
    console.log(record)
    await axios.post('/api/order', record).then()
  }
  return (
    <>
      <Button colorScheme={'blue'} onClick={onOpen}>
        注文入力
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>注文追加</ModalHeader>
          <ModalCloseButton />
          <Text>以下の内容で追加します</Text>
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
                  {record.price.value}円
                </Box>
              </Flex>
              <Divider py={3} />
              <form>
                <Box py={2}>
                  <FormControl id={'purchase_order_date'} isRequired>
                    <FormLabel>発注日</FormLabel>
                    <Input type={'date'} size="md" />
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl id={'receiving_date'} isRequired>
                    <FormLabel>受取日</FormLabel>
                    <Input type={'date'} size="md" />
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isRequired>
                    <FormLabel>個数</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
                      placeholder="個数"
                      isRequired
                    />
                  </FormControl>
                </Box>
                <Box py={2}>
                  <FormControl isRequired>
                    <FormLabel>ロースト</FormLabel>
                    <Input
                      type={'Number'}
                      size="md"
                      placeholder="ロースト"
                      isRequired
                    />
                  </FormControl>
                </Box>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={'blue'} onClick={onAdd}>
              注文に追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default OrderDialog
