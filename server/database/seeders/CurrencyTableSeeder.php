<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class CurrencyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $GET_BTC_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_ETH_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ethereum&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_XRP_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ripple&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_BCH_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin-cash&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_ADA_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=cardano&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_LTC_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=litecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_XEM_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=nem&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_XLM_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=stellar&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_MIOTA_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=iota&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        $GET_DASH_SET = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=dash&order=market_cap_desc&per_page=10&page=1&sparkline=false';

        $requestsArray = [
            $GET_BTC_SET, $GET_ETH_SET, $GET_XRP_SET, $GET_BCH_SET, $GET_ADA_SET,
            $GET_LTC_SET, $GET_XEM_SET, $GET_XLM_SET, $GET_MIOTA_SET, $GET_DASH_SET
        ];

        $makeRequests = function ($value) {
            return Http::get($value);
        };

        $returnValue = function ($value) {
            return [
                "coin_id" => $value[0]["id"],
                "current_price" => $value[0]["current_price"],
                "name" => $value[0]["name"],
                "symbol" => $value[0]["symbol"],
                "last_updated" => $value[0]["last_updated"],
            ];
        };

        $responsesArray = array_map($makeRequests, $requestsArray);
        $eachResponseArray = array_map($returnValue, $responsesArray);

        foreach ($eachResponseArray as $value) {
            DB::table('currencies')->insert([$value]);
        };
    }
}
