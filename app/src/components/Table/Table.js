import React from "react";
import TableRow from "./TableRow/TableRow";

export default function Table() {
    return (
        <section className="w-6/12 mx-auto">
            <div className="flex justify-between items-center mb-4" >
                <h2 className="text-white font-semibold text-2xl">Marketing Values</h2>
                <button className="text-white text-3xl" >:</button>
            </div>

            <table className="container">
                <thead className="mb-6">
                    <tr>
                        <th className="text-gray-700 w-2/12 text-left text-sm">Coin</th>
                        <th className="text-gray-700 w-1/12 text-left text-sm">Price</th>
                        <th className="text-gray-700 w-1/12 text-left text-sm">1h</th>
                        <th className="text-gray-700 w-2/12 text-left text-sm">24 volume</th>
                        <th className="text-gray-700 w-2/12 text-left text-sm">Market Cap</th>
                        <th className="text-gray-700 w-2/12 text-left text-sm">Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRow />
                </tbody>
            </table>
        </section>
    )
};