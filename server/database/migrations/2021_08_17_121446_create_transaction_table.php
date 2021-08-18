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

            $table->unsignedInteger("currency_id")->nullable();
            $table->foreign("currency_id")->references("id")->on("currencies");

            $table->integer("currency_value");

            $table->boolean("type");

            $table->unsignedInteger("user_id")->nullable();
            $table->foreign("user_id")->references("id")->on("users");

            $table->integer("transaction_amount");

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
