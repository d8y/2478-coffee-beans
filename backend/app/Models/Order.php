<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'coffee_beans_id',
        'purchase_order_date',
        'receiving_date',
        'grams',
        'price',
        'roast',
    ];
}
