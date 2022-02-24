import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import React from 'react'
import { MasterListContents } from '@/components/pages/masterList'
import { Master } from '@/types'
import { Title } from '@/components/title'

type Props = {
  records: Array<Master>
  totalCount: Number
}

const MasterList = ({ records, totalCount }: Props) => {
  return (
    <>
      <Title />
      <MasterListContents records={records} />
    </>
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
    query: 'is_deleted not in ("削除")',
  })

  return {
    props: result,
  }
}

export default MasterList
