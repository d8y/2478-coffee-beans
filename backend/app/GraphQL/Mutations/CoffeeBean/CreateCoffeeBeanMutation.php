<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\CoffeeBean;

use App\Models\CoffeeBean;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class CreateCoffeeBeanMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createCoffeeBean',
        'description' => 'コーヒー豆の登録',
    ];

    public function type(): Type
    {
        return GraphQL::type('CoffeeBean');
    }

    public function args(): array
    {
        return [
            'coffee_no' => [
                'name' => 'coffee_no',
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required']
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

    public function resolve($root, array $args, $context, ResolveInfo $info, SelectFields $fields): CoffeeBean
    {
        $coffeeBean = new CoffeeBean();
        $coffeeBean->fill($args);
        $coffeeBean->save();

        return $coffeeBean;
    }
}
