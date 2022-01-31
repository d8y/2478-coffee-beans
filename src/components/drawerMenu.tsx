import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

export const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label={'leftIcon'}
        variant={'unstyled'}
      />
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">コーヒー豆管理</DrawerHeader>
          <DrawerBody>
            <Stack pl={4}>
              <NextLink href={'/cart'}>
                <Link>カート</Link>
              </NextLink>
              <NextLink href={'/master-list'}>
                <Link>商品一覧</Link>
              </NextLink>
              <NextLink href={'/order-list'}>
                <Link>発注履歴</Link>
              </NextLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
