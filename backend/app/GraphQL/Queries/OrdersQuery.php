<?php

namespace App\GraphQL\Queries;

use App\Models\Order;
use Closure;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class OrdersQuery extends Query
{
    protected $attributes = [
        'coffee_beans_id' => '商品id',
        'purchase_order_date' => '発注日',
        'product_name' => '受取日',
        'receiving_date' => '商品名',
        'grams' => 'グラム',
        'price' => '金額',
        'roast' => 'ロースト',
    ];

    public function type(): Type
    {
        return Type::listOf(Type::nonNull(GraphQL::type('Order')));
    }

    public function args(): array
    {
        return parent::args(); // TODO: Change the autogenerated stub
    }

    public function resolve($root, array $args, $context, GraphQL\Type\Definition\ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        return Order::all();
    }
}
