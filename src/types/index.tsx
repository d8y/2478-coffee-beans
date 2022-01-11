export type KintoneResponse = {
  records: Array<Order>
  totalCount: number
}

type NumberValue = {
  value: number
}

type DateValue = {
  value: Date
}

type StringValue = {
  value: string
}

export type Order = {
  id: NumberValue
  purchase_order_date: DateValue
  receiving_date: DateValue
  coffee_no: NumberValue
  product_name: StringValue
  count: NumberValue
  price: NumberValue
  grams: NumberValue
  roast: NumberValue
}

export type Master = {
  id: NumberValue
  coffee_no: NumberValue
  product_name: StringValue
  grams: NumberValue
  price: NumberValue
  roast: NumberValue
}
