import { atom } from 'recoil'
import { Cart } from '@/types'

export const cartState = atom<Cart[]>({
  key: 'cartItems',
  default: [],
})
