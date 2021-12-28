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
    console.log(req.body)
    client.record
      .addRecord({
        app: appId,
        record: {
          purchase_order_date: { value: '2021-12-10' },
          receiving_date: { value: '2021-12-10' },
          coffee_no: { value: 6 },
          product_name: { value: 'パナマ　エスメラルダ　ゲイシャ' },
          count: { value: 1 },
          price: { value: 4000 },
          grams: { value: 100 },
          roast: { value: 5 },
        },
      })
      .then(({ id, revision }) => {
        return res
          .statusCode(200)
          .setHeader('Content-Type', 'application/json')
          .end(JSON.stringify('success'))
      })
      .catch((e) => {
        console.log(e.errors)
      })
  }
}
