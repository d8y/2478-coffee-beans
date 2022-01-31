import { atom } from 'recoil'
import { Order } from '@/types'

export const cartState = atom<Order[]>({
  key: 'cartItems',
  default: [],
})
