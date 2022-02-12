import { ContentsRow } from '@/components/pages/masterList/orderDialog/contentsRow'
import { Gram } from '@/components/ui/Gram'
import { Price } from '@/components/ui/Price'
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
