<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\Order;

use Closure;
use GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class CreateOrderMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createOrder',
        'description' => '注文の登録'
    ];

    public function type(): Type
    {
        return GraphQL::type('Order');
    }

    public function args(): array
    {
        return [
            'coffee_bean_id' => [
                'name' => 'coffee_bean_id',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required']
            ],
            'purchase_order_date' => [
                'name' => 'purchase_order_date',
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required', 'date']
            ],
            'receiving_date' => [
                'name' => 'receiving_date',
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required', 'date']
            ],
            'coffee_no' => [
                'name' => 'coffee_no',
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required', 'max:64']
            ],
            'product_name' => [
                'name' => 'product_name',
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required', 'max:128']
            ],
            'grams' => [
                'name' => 'grams',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer']
            ],
            'price' => [
                'name' => 'price',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer']
            ],
            'roast' => [
                'name' => 'roast',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'between:1,6']
            ],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        return [];
    }
}
