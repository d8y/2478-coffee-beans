/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  cart: {
    $url: (url?: { hash?: string }) => ({ pathname: '/cart' as const, hash: url?.hash })
  },
  master: {
    $url: (url?: { hash?: string }) => ({ pathname: '/master' as const, hash: url?.hash })
  },
  order: {
    $url: (url?: { hash?: string }) => ({ pathname: '/order' as const, hash: url?.hash })
  }
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
export const staticPath = {

} as const

// prettier-ignore
export type StaticPath = typeof staticPath
