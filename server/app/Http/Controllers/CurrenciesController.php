<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;

class CurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Currency::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "ath" => "required",
            "ath_change_percentage" => "required",
            "ath_date" => "required",
            "atl" => "required",
            "atl_change_percentage" => "required",
            "atl_date" => "required",
            "circulating_supply" => "required",
            "current_price" => "required",
            'fully_diluted_valuation' => "required",
            "high_24h" => "required",
            "coin_id" => "required",
            "image" => "required",
            "last_updated" => "required",
            "low_24h" => "required",
            "market_cap" => "required",
            "market_cap_change_24h" => "required",
            "market_cap_change_percentage_24h" => "required",
            "market_cap_rank" => "required",
            "max_supply" => "required",
            "name" => "required",
            "price_change_24h" => "required",
            "price_change_percentage_24h" => "required",
            "symbol" => "required",
            "total_supply" => "required",
            "total_volume" => "required"
        ]);

        $currency = Currency::create($request->all());

        return [
            "currency" => $currency,
            "message" => "Currency created"
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Currency::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $currency = Currency::find($id);

        $request->validate([
            "ath" => "required",
            "ath_change_percentage" => "required",
            "ath_date" => "required",
            "atl" => "required",
            "atl_change_percentage" => "required",
            "atl_date" => "required",
            "circulating_supply" => "required",
            "current_price" => "required",
            'fully_diluted_valuation' => "required",
            "high_24h" => "required",
            "coin_id" => "required",
            "image" => "required",
            "last_updated" => "required",
            "low_24h" => "required",
            "market_cap" => "required",
            "market_cap_change_24h" => "required",
            "market_cap_change_percentage_24h" => "required",
            "market_cap_rank" => "required",
            "max_supply" => "required",
            "name" => "required",
            "price_change_24h" => "required",
            "price_change_percentage_24h" => "required",
            "symbol" => "required",
            "total_supply" => "required",
            "total_volume" => "required"
        ]);

        $currency->update($request->all());

        return [
            "currency" => $currency,
            "message" => "Currency updated"
        ];
    }
}
