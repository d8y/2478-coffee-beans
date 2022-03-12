<?php

declare(strict_types=1);

namespace App\GraphQL\Inputs;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\InputType;

class OrderInput extends InputType
{
    protected $attributes = [
        'name' => 'OrderInput',
        'description' => 'order input',
    ];

    public function fields(): array
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
            'count' => [
                'name' => 'count',
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
}
