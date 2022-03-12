<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'coffee_bean_id',
        'purchase_order_date',
        'receiving_date',
        'grams',
        'price',
        'roast',
    ];

    public function coffeeBean(): HasOne
    {
        return $this->hasOne(CoffeeBean::class, 'id', 'coffee_bean_id');
    }
}
