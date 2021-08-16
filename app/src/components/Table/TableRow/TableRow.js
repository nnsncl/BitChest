import React from "react";

export default function TableRow({ icon, data, admin }) {
    return (
        <>
            <tr>
                {data.map((item, key) => {
                    if (key === 0) {
                        return (
                            <td className="text-white gap-3 flex items-center pt-3">
                                <span>{icon}</span>
                                <p>{item}</p>
                            </td>
                        )
                    } else {
                        return (
                            <td className="text-white pt-3">
                                <p>{item}</p>
                            </td>
                        )
                    }
                })}
            </tr>

            <tr>
                {data.map((item, key) => {
                    if (key === 0) {
                        return (
                            <td className="text-white gap-3 flex items-center pt-3">
                                <span>{icon}</span>
                                <p>{item}</p>
                            </td>
                        )
                    } else {
                        return (
                            <td className="text-white pt-3">
                                <p>{item}</p>
                            </td>
                        )
                    }
                })}
            </tr>
        </>
    )
}