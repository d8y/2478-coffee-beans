import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import type { NextApiRequest, NextApiResponse } from 'next'

const HTTP_SUCCESS_CODE = 200

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { TRANSACTION_DATA_KINTONE_APP_ID: appId } = process.env
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

    return res.status(HTTP_SUCCESS_CODE).json({
      ...result,
    })
  }

  if (req.method === 'POST') {
    try {
      await client.record.addRecords({ app: appId, records: req.body })

      res
        .status(HTTP_SUCCESS_CODE)
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify('success'))
    } catch (e: any) {
      res.status(e.response.status).json({
        error: e.errors,
      })
    }
  }
}

export default handler
