/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  cart: {
    $url: (url?: { hash?: string }) => ({ pathname: '/cart' as const, hash: url?.hash })
  },
  master_list: {
    $url: (url?: { hash?: string }) => ({ pathname: '/master-list' as const, hash: url?.hash })
  },
  order_list: {
    $url: (url?: { hash?: string }) => ({ pathname: '/order-list' as const, hash: url?.hash })
  }
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
export const staticPath = {

} as const

// prettier-ignore
export type StaticPath = typeof staticPath
