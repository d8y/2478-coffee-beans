import { Box, Container, HStack } from '@chakra-ui/react'
import { DrawerMenu } from '@/components/drawerMenu'
import React, { ReactNode } from 'react'
import { Footer } from '@/components/footer'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <Container maxW={'container.xl'} centerContent>
      <HStack align={'top'}>
        <Box p={4} position={'fixed'} left={0}>
          <DrawerMenu />
        </Box>
        <Box p={4}>{children}</Box>
      </HStack>
      <Footer />
    </Container>
  )
}
