import React from "react";

export const Table = ({ headings, children }) => {

    return (
        <table className="w-full">
            <thead className="mb-6 w-full">
                <tr className='flex items-center justify-between text-white py-4 gap-3 border-t-2 border-b-2 border-gray-800 px-4'>
                    {headings &&
                        headings.map((item, key) => (
                            <th key={key} className="text-left text-xs w-2/12" >{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="text-white w-full">
                {children}
            </tbody>
        </table>
    );
}
