import { Th, Thead, Tr } from '@chakra-ui/react'

type Props = {
  headers: Array<string>
}

export const TableHeader = ({ headers }: Props) => {
  return (
    <Thead>
      <Tr>
        {headers.map((header, key) => (
          <Th key={key}>{header}</Th>
        ))}
      </Tr>
    </Thead>
  )
}
