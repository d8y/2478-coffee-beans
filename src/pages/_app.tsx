import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
