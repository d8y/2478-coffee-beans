import { ContentsRow } from '@/components/pages/masterList/orderDialog/ContentsRow'
import { Gram } from '@/components/ui/Gram'
import { Price } from '@/components/ui/Price'
import { CoffeeBean } from '@/generated/graphql'

type Props = {
  coffeeBean: CoffeeBean
}

export const ContentsHeader = ({ coffeeBean }: Props) => {
  return (
    <>
      <ContentsRow header={'コーヒーNo'} value={coffeeBean.coffee_no} />
      <ContentsRow header={'商品名'} value={coffeeBean.product_name} />
      <ContentsRow header={'グラム'} value={<Gram gram={coffeeBean.grams} />} />
      <ContentsRow header={'金額'} value={<Price price={coffeeBean.price} />} />
    </>
  )
}
