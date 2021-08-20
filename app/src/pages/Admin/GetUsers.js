import React from "react";

import { Navigation } from "../../components/Navigation";
import { Loader } from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow/TableRow";

import { useAuth } from '../../hooks/use-auth';

import { getSessionTokenCookie } from "../../constants/session-storage-endpoints";
import { column_titles, userCryptoData } from "../../constants/tableHeads";

export default function GetUsers() {
    const auth = useAuth();


    if (getSessionTokenCookie && !auth.user) {
        auth.getAuthUser();
        return <Loader />;
    }

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