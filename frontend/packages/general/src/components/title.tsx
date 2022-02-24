import Head from 'next/head'

type Props = {
  title?: String
}

const defaultTitle = 'コーヒー豆管理'

export const Title = ({ title = defaultTitle }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  )
}
