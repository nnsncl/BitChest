<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->integerIncrements("id");
            $table->integer("transaction_amount");

            $table->unsignedInteger("currency_id")->nullable();
            $table->foreign("currency_id")->references("id")->on("currencies");

            $table->unsignedInteger("currency_current_value")->nullable();
            // $table->foreign("currency_current_value")->references("current_price")->on("currencies");

            $table->boolean("type");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
