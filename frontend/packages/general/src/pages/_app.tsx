import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Meta } from '@/components/meta'
import { DefaultLayout } from '@/components/layouts/DefaultLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Meta />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </RecoilRoot>
  )
}
