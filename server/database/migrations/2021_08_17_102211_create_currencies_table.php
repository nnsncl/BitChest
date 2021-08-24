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
            $table->integerIncrements("id");
            $table->integer("ath")->default(0);
            $table->decimal("ath_change_percentage")->default(0);
            $table->string("ath_date");
            $table->decimal("atl")->default(0);
            $table->decimal("atl_change_percentage")->default(0);
            $table->string("atl_date");
            $table->bigInteger("circulating_supply")->default(0);
            $table->float("current_price", 100, 10)->default(0);
            $table->float("fully_diluted_valuation", 100, 10)->default(0);
            $table->float("high_24h", 100, 10)->default(0);
            $table->string("coin_id");
            $table->string("image");
            $table->string("last_updated");
            $table->float("low_24h", 100, 10)->default(0);
            $table->bigInteger("market_cap")->default(0);
            $table->float("market_cap_change_24h", 100, 10)->default(0);
            $table->decimal("market_cap_change_percentage_24h")->default(0);
            $table->integer("market_cap_rank")->default(0);
            $table->bigInteger("max_supply")->default(0);
            $table->string("name");
            $table->decimal("price_change_24h")->default(0);
            $table->decimal("price_change_percentage_24h")->default(0);
            $table->string("symbol");
            $table->bigInteger("total_supply")->default(0);
            $table->bigInteger("total_volume")->default(0);
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
