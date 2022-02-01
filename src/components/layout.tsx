import { Box, Container, HStack } from '@chakra-ui/react'
import { DrawerMenu } from '@/components/drawerMenu'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <Container maxW={'container.xl'} centerContent>
      <HStack align={'top'}>
        <Box p={4} position={'fixed'} left={0}>
          <DrawerMenu />
        </Box>
        <Box p={4}>{children}</Box>
      </HStack>
    </Container>
  )
}
