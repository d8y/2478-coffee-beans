import {
  Badge,
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
import { useRecoilValue } from 'recoil'
import { cartCounter } from '@/selectors/cart'
import { Footer } from '@/components/footer'
import { pagesPath } from '@/lib/$path'

export const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartCount = useRecoilValue(cartCounter)

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label={'leftIcon'}
        variant={'styled'}
      />
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">コーヒー豆管理</DrawerHeader>
          <DrawerBody>
            <Stack pl={4}>
              <NextLink href={pagesPath.cart.$url().pathname}>
                <Link onClick={onClose}>
                  カート<Badge>{cartCount}</Badge>
                </Link>
              </NextLink>
              <NextLink href={pagesPath.master.$url().pathname}>
                <Link onClick={onClose}>商品一覧</Link>
              </NextLink>
              <NextLink href={pagesPath.order.$url().pathname}>
                <Link onClick={onClose}>発注履歴</Link>
              </NextLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Footer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
