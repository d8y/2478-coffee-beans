type Props = {
  price: number
}

export const Price = ({ price }: Props) => {
  const value = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(price)

  return <span>{value}</span>
}
