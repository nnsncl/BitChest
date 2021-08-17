import React from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow/TableRow";

import { column_titles, userCryptoData } from "../../constants/tableHeads";

export default function GetUsers() {

    return (
        <main className='bg-gray-900 h-screen flex' >
            <Navigation />

            <Table columnTitles={column_titles} data={userCryptoData}>
                <TableRow icon={"icon"} data={userCryptoData} error>
                    <td>
                        <button>Edit</button>
                    </td>
                    <td>
                        <button>Delete</button>
                    </td>
                </TableRow>
            </Table>
        </main>
    )
}