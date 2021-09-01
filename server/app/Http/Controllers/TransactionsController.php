<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use App\Models\User;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Transactions::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function purchase(Request $request)
    {

        $request->validate([
            "currency_id" => "required",
            "currency_value" => "required",
            "type" => "required",
            "user_id" => "required",
            "transaction_amount" => "required",
            "currency_quantity" => "required",
        ]);

        Transactions::create($request->all());

        $user = User::find($request->user_id);

        $user->balance = $user->balance - $request->transaction_amount;

        $user->save();

        return [
            "message" => "Transaction created !",
        ];
    }

    /**
     * Remove an existing resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
    */
    public function sell(Request $request)
    {
        $request->validate([
            "currency_id" => "required",
            "currency_value" => "required",
            "type" => "required",
            "user_id" => "required",
            "transaction_amount" => "required",
            "currency_quantity" => "required",
            "roi" => "required",
        ]);

        Transactions::create($request->all());

        $user = User::find($request->user_id);

        $user->balance = $user->balance - $request->transaction_amount;

        $user->save();

        return [
            "message" => "Transaction created !",
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
        return Transactions::find($id);
    }
}
