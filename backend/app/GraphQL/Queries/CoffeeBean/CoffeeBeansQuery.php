<?php

declare(strict_types=1);

namespace App\GraphQL\Queries\CoffeeBean;

use App\Models\CoffeeBean;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class CoffeeBeansQuery extends Query
{
    protected $attributes = [
        'coffee_no' => '商品名',
        'product_name' => '商品名',
        'grams' => 'グラム',
        'price' => '金額',
        'roast' => 'ロースト',
    ];

    public function type(): Type
    {
        return Type::listOf(Type::nonNull(GraphQL::type('CoffeeBean')));
    }

    public function args(): array
    {
        return [];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        return CoffeeBean::all();
    }
}
