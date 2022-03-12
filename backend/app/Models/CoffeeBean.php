<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CoffeeBean extends Model
{
    protected $fillable = [
        'coffee_no',
        'product_name',
        'grams',
        'price',
        'roast',
    ];

    public function order(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
