<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    /**
     * @return void
     */
    public function up()
    {
        Schema::create('coffee_beans', function (Blueprint $table) {
            $table->id();
            $table->string('coffee_no', 64)->comment();
            $table->string('product_name', 128)->comment();
            $table->smallInteger('grams')->comment();
            $table->smallInteger('price')->comment();
            $table->tinyInteger('roast')->comment();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coffee_beans');
    }
};
