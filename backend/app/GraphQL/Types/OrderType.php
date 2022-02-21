<?php

namespace App\GraphQL\Types;

use App\Models\Order;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class OrderType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Order',
        'description' => 'order',
        'model' => Order::class,
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'id',
            ],
            'coffee_bean_id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => '商品番号',
            ],
            'purchase_order_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => '発注日',
            ],
            'receiving_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => '受取日',
            ],
            'coffee_no' => [
                'type' => Type::nonNull(Type::string()),
                'description' => '商品番号',
            ],
            'product_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => '商品名'
            ],
            'grams' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'グラム',
            ],
            'price' => [
                'type' => Type::nonNull(Type::int()),
                'description' => '金額',
            ],
            'roast' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ロースト',
            ],
        ];
    }
}
