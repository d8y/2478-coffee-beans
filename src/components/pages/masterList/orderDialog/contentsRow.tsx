import {
  Box,
  Flex,
  FlexProps,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  header: string
  value: ReactNode
} & FlexProps

export const ContentsRow = ({ header, value, ...flexProps }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
      {...flexProps}
    >
      <Box as={'dt'} minWidth="8rem">
        {header}
      </Box>
      <Spacer />
      <Box as={'dd'} fontWeight={'semibold'}>
        {value}
      </Box>
    </Flex>
  )
}
