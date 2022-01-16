import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export default async (req, res) => {
  const appId = process.env.TRANSACTION_DATA_KINTONE_APP_ID
  if (!appId) {
    throw new Error('kintone app id が設定されていません')
  }

  const client = new KintoneRestAPIClient({
    baseUrl: process.env.KINTONE_END_POINT,
    auth: {
      apiToken: process.env.TRANSACTION_DATA_KINTONE_APP_API_TOKEN,
    },
  })

  if (req.method === 'GET') {
    const result = await client.record.getRecords({
      app: appId,
      totalCount: true,
    })

    return res.status(200).json({
      ...result,
    })
  }

  if (req.method === 'POST') {
    console.log('post')
    try {
      await client.record.addRecord({ app: appId, record: req.body })

      res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify('success'))
    } catch (e) {
      console.log(e.errors)
      res.status(e).json({})
    }
  }
}
