import { ContentsRow } from '@/components/orderDialog/contentsRow'
import { Gram } from '@/components/gram'
import { Price } from '@/components/price'
import { Master } from '@/types'

type Props = {
  record: Master
}

export const ContentsHeader = ({ record }: Props) => {
  return (
    <>
      <ContentsRow header={'コーヒーNo'} value={record.coffee_no.value} />
      <ContentsRow header={'商品名'} value={record.product_name.value} />
      <ContentsRow
        header={'グラム'}
        value={<Gram gram={record.grams.value} />}
      />
      <ContentsRow
        header={'金額'}
        value={<Price price={record.price.value} />}
      />
    </>
  )
}
