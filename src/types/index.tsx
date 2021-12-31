export type KintoneResponse = {
    records: Array<Order>,
    totalCount: number
}

export type Order = {
    id: {
        type: string
        value: number
    }
    purchase_order_date: {
        type: string
        value: Date
    }
    receiving_date: {
        type: string
        value: Date
    }
    coffee_no: {
        type: string
        value: number
    }
    product_name: {
        type: string
        value: string
    }
    count: {
        type: string
        value: number
    }
    price: {
        type: string
        value: number
    }
    grams: {
        type: string
        value: number
    }
    roast: {
        type: string
        value: number
    }
}