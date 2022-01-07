import ContentsRow from '@/components/orderDialog/contentsRow'
import Gram from '@/components/gram'
import Price from '@/components/price'

const ContentsHeader = ({ record }) => {
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

export default ContentsHeader
