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
        "currency_name",
        "type",
        "user_id",
        "transaction_amount",
        "currency_quantity",
        "roi"
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function currencies() {
        return $this->hasOne(Currency::class);
    }
}
