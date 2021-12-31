interface Props {
  price: string
}

const price = (props: Props) => {
  const price = parseInt(props.price).toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  })

  return <span>{price}</span>
}

export default price
