import React from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";

export default function GetUsers() {

    const column_titles = [
        "Coin",
        "Price",
        "1h",
        "24 volume",
        "Market Cap",
        "Last 7 Days"
    ];

    const userCryptoData = [
        "BTC/USDT",
        "$35.608,12",
        "+0.8%",
        "$26,473,275,010",
        "$635,353,344,920",
        "graph"
    ];

    return (
        <main className='bg-gray-900 h-screen flex' >
            <Navigation />

            <Table columnTitles={column_titles} data={userCryptoData} />
        </main>
    )
}