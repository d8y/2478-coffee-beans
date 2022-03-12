import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Meta } from '@/components/meta'
import { DefaultLayout } from '@/components/layouts/DefaultLayout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_GRAPHQL_URL}`,
  cache: new InMemoryCache(),
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider>
          <Meta />
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
