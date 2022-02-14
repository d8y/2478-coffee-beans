<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoffeeBean extends Model
{
    protected $fillable = [
        'coffee_no',
        'product_name',
        'grams',
        'price',
        'roast',
    ];
}
