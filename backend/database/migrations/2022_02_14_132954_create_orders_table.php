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
            $table->unsignedBigInteger('coffee_bean_id')->comment();
            $table->date('purchase_order_date')->comment();
            $table->date('receiving_date')->comment();
            $table->smallInteger('grams')->comment();
            $table->smallInteger('price')->comment();
            $table->smallInteger('count')->comment();
            $table->tinyInteger('roast')->comment();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('coffee_bean_id')
                ->references('id')
                ->on('coffee_beans')
                ->onUpdate('RESTRICT')
                ->onDelete('RESTRICT');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
