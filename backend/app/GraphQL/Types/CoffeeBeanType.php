<?php

namespace App\GraphQL\Types;

use App\Models\CoffeeBean;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;


class CoffeeBeanType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CoffeeBean',
        'description' => 'A CoffeeBean',
        'model' => CoffeeBean::class,
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id())
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
