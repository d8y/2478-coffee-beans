<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('coffee_bean_id')->comment();
            $table->date('purchase_order_date')->comment();
            $table->date('receiving_date')->comment();
            $table->smallInteger('grams')->comment();
            $table->smallInteger('price')->comment();
            $table->tinyInteger('roast')->comment();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
