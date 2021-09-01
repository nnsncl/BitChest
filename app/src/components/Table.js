import React from "react";

export const Table = ({ boxed, headings, children }) => {

    return (
        <table className={`${boxed && 'bg-black rounded-2xl'} w-full`}>
            <thead className={`mb-6 w-full`}>
                <tr className={`${boxed ? 'p-6 ' : 'border-t-2 border-b-2 border-gray-800 py-4 px-4 ' } flex items-center justify-between text-white gap-6  `}>
                    {headings}
                </tr>
            </thead>
            <tbody className="text-white w-full">
                {children}
            </tbody>
        </table>
    );
}
