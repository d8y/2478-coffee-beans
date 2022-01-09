import { Box, Container, HStack } from '@chakra-ui/react'
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import React from 'react'
import DrawerMenu from '@/components/drawerMenu'
import MasterListContents from '@/components/masterListContents'

export default ({ records, totalCount }) => {
  return (
    <Container maxW={'container.xl'} centerContent>
      <HStack align={'top'}>
        <Box p={4}>
          <DrawerMenu />
        </Box>
        <Box p={4}>
          <MasterListContents records={records} />
        </Box>
      </HStack>
    </Container>
  )
}

export async function getServerSideProps() {
  const appId = process.env.MASTER_DATA_KINTONE_APP_ID
  if (!appId) {
    throw new Error('kintone app id が設定されていません')
  }

  const client = new KintoneRestAPIClient({
    baseUrl: process.env.KINTONE_END_POINT,
    auth: {
      apiToken: process.env.MASTER_DATA_KINTONE_APP_API_TOKEN,
    },
  })

  const result = await client.record.getRecords({
    app: appId,
    totalCount: true,
  })

  return {
    props: result,
  }
}
