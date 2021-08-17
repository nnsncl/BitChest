<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->integer("ath");
            $table->decimal("ath_change_percentage");
            $table->string("ath_date");
            $table->decimal("atl");
            $table->decimal("atl_change_percentage");
            $table->string("atl_date");
            $table->integer("circulating_supply");
            $table->integer("current_price");
            $table->integer("fully_diluted_valuation");
            $table->integer("high_24h");
            $table->string("coin_id");
            $table->string("image");
            $table->string("last_updated");
            $table->integer("low_24h");
            $table->integer("market_cap");
            $table->decimal("market_cap_change_24h");
            $table->decimal("market_cap_change_percentage_24h");
            $table->integer("market_cap_rank");
            $table->integer("max_supply");
            $table->string("name");
            $table->decimal("price_change_24h");
            $table->decimal("price_change_percentage_24h");
            $table->string("symbol");
            $table->integer("total_supply");
            $table->integer("total_volume");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('currencies');
    }
}
