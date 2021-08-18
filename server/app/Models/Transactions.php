<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;
    protected $fillable = [
        "currency_id",
        "currency_value",
        "type",
        "user_id",
        "transaction_amount"
    ];
}
