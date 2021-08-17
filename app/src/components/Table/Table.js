import React from "react";

export default function Table({ columnTitles, children }) {


    return (
        <section className="w-6/12 mx-auto">
            <div className="flex justify-between items-center mb-4" >
                <h2 className="text-white font-semibold text-2xl">Marketing Values</h2>
                <button className="text-white text-3xl" >:</button>
            </div>

            <table className="container">
                <thead className="mb-6">
                    <tr>
                        {columnTitles.map((item, key) => (
                            <th key={key} className="text-gray-700 w-2/12 text-left text-sm" >{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-white">
                    {children}
                </tbody>
            </table>
        </section>
    )
};