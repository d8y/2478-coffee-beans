<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class CoffeeBeansMutationResponseType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CoffeeBeansMutationResponse',
        'description' => 'coffeeBeansMutationResponse'
    ];

    public function fields(): array
    {
        return [
            'affectedRows' => [
                'type' => Type::int(),
                'description' => 'insert number',
                'alias' => 'affected_rows',
            ]
        ];
    }
}
