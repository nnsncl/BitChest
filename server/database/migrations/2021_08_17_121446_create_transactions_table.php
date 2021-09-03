<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
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
            $table->boolean("type");
            $table->unsignedInteger("user_id")->nullable();
            $table->foreign("user_id")->references("id")->on("users");

            $table->unsignedInteger("currency_id")->nullable();
            $table->foreign("currency_id")->references("id")->on("currencies");
            $table->float("currency_value");
            $table->string("currency_name");
            $table->float("currency_quantity", 30, 20);

            $table->integer("transaction_amount");
            $table->float("roi")->nullable();
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
