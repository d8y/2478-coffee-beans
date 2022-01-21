type Props = {
  price: number
}

export const Price = (props: Props) => {
  const price = props.price.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  })

  return <span>{price}</span>
}
