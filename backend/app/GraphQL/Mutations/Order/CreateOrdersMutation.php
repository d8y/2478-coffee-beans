<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\Order;


use App\Models\Order;
use Closure;
use DB;
use GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class CreateOrdersMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createOrders',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return GraphQL::type('CoffeeBeansMutationResponse');
    }

    public function args(): array
    {
        return [
            'input' => [
                'type' => GraphQL::type('[OrderInput!]!'),
            ]
        ];
    }


    /**
     * @param mixed $root
     * @param array $args
     * @param mixed $context
     * @param ResolveInfo $resolveInfo
     * @param Closure $getSelectFields
     */
    public function resolve(
        mixed       $root,
        array       $args,
        mixed       $context,
        ResolveInfo $resolveInfo,
        Closure     $getSelectFields
    ): object
    {
        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        $affectedRows = DB::transaction(function () use ($args) {
            return Order::upsert($args['input'], 'id');
        });

        return (object)[
            'affected_rows' => $affectedRows
        ];
    }
}
