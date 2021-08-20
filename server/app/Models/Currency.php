<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "ath",
        "ath_change_percentage",
        "ath_date",
        "atl",
        "atl_change_percentage",
        "atl_date",
        "circulating_supply",
        "current_price",
        'fully_diluted_valuation',
        "high_24h",
        "coin_id",
        "image",
        "last_updated",
        "low_24h",
        "market_cap",
        "market_cap_change_24h",
        "market_cap_change_percentage_24h",
        "market_cap_rank",
        "max_supply",
        "name",
        "price_change_24h",
        "price_change_percentage_24h",
        "symbol",
        "total_supply",
        "total_volume"
    ];

    public function transactions() {
        return $this->belongsTo(Transactions::class);
    }
}
