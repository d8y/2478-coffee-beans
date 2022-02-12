import { Text } from '@chakra-ui/react'
import { Dayjs } from 'dayjs'

type Props = {
  date: Dayjs
}

export const Date = ({ date }: Props) => {
  return (
    <>
      <Text fontSize={'xs'} color={'gray.500'}>
        {date.format('YYYY')}
      </Text>
      <Text>{date.format('M/DD')}</Text>
    </>
  )
}
