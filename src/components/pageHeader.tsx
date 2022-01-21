import { Text } from '@chakra-ui/react'

type Props = {
  title: string
}

export const PageHeader = ({ title }: Props) => {
  return (
    <Text align={'center'} fontSize={'2xl'}>
      {title}
    </Text>
  )
}
