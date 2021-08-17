import React from "react";

export default function TableRow({ icon, data, error, children }) {
    return (
        <>
            <tr>
                {data.map((item, key) => {
                    if (key === 0) {
                        return (
                            <td className="text-white gap-3 flex items-center pt-3">
                                {icon && <span>{icon}</span>}
                                <p>{item}</p>
                            </td>
                        )
                    }
                    else {
                        return (
                            <td className="text-white pt-3">
                                <p className={`${key === 2 && error && "text-gray-700"}`} >{item}</p>
                            </td>
                        )
                    }
                })}
                {children}
            </tr>
        </>
    )
}