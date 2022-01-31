import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import React from 'react'
import { MasterListContents } from '@/components/masterListContents'
import { Master } from '@/types'

type Props = {
  records: Array<Master>
  totalCount: Number
}

export default ({ records, totalCount }: Props) => {
  return <MasterListContents records={records} />
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
