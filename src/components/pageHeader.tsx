import { Text } from '@chakra-ui/react'

type Props = {
  title: string
}

const pageHeader = ({ title }: Props) => {
  return (
    <Text align={'center'} fontSize={'2xl'}>
      {title}
    </Text>
  )
}

export default pageHeader
