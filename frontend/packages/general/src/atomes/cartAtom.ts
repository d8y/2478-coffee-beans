import { atom } from 'recoil'
import { MutationCreateOrderArgs } from '@/generated/graphql'
import { Cart } from '@/types'

type CartItemType = MutationCreateOrderArgs & Cart

export const cartState = atom<CartItemType[]>({
  key: 'cartItems',
  default: [],
})
