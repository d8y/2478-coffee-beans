export type KintoneResponse = {
  records: Array<Order>
  totalCount: number
}

type NumberValue = {
  value: number
}

type StringValue = {
  value: string
}

export type Order = {
  id: NumberValue
  purchase_order_date: StringValue
  receiving_date: StringValue
  coffee_no: NumberValue
  product_name: StringValue
  count: NumberValue
  price: NumberValue
  grams: NumberValue
  roast: NumberValue
  master_id: NumberValue
}

export type Master = {
  id: NumberValue
  coffee_no: NumberValue
  product_name: StringValue
  grams: NumberValue
  price: NumberValue
  roast: NumberValue
}

export type Cart = {
  purchase_order_date: StringValue
  receiving_date: StringValue
  coffee_no: NumberValue
  product_name: StringValue
  count: NumberValue
  price: NumberValue
  grams: NumberValue
  roast: NumberValue
  master_id: NumberValue
}
