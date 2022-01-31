import { selector } from 'recoil'
import { cartState } from '@/atomes/cartAtom'

export const cartSelector = selector({
  key: 'cartSelector',
  get: () => {
    return cartState
  },
})
