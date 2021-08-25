import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '../../hooks/use-auth';
import { AdminContext } from '../../hooks/use-admin';

import { Layout } from '../../components/Layout';
import { Loader } from '../../components/Loader';
import { Table } from '../../components/Table';

import { container, article } from '../../animations/motion';

import { getSessionTokenCookie } from "../../constants/session-storage-endpoints";


export default function Admin() {
    const auth = useAuth();
    const admin = useContext(AdminContext);

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (getSessionTokenCookie && !auth.user) {
        return <Loader />;
    }

    console.log(admin.users)

    return (
        <Layout>
            <header className='mb-12' >
                <h1 className='text-3xl font-bold mb-2'>Hi, {auth.user && auth.user.name}</h1>
                <p className='text-gray-700' >Manage users informations and permissions.</p>
            </header>

            <section>
                <Table headings={
                    <>
                        <th className="w-1/3 text-left text-xs" >Name</th>
                        <th className="w-1/3 text-left text-xs" >Email</th>
                        <th className="w-1/3 text-left text-xs" >Balance</th>
                        <th className="w-1/3 text-left text-xs md:block hidden" >Role</th>
                        <th className="w-1/3 text-left text-xs md:block hidden" ></th>
                    </>
                }>
                    {
                        admin.users && admin.users.map((user, key) => (
                            <motion.tr
                                key={key}
                                initial='hidden'
                                animate='visible'
                                variants={container}
                                className='flex items-center justify-between gap-3 text-white py-6 px-4 gap-6 border-b-2 border-gray-800 transition hover:bg-gray-800'>

                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <input
                                        placeholder='User name'
                                        value={user.name}
                                        onChange={() => console.log('changed')}
                                        className='bg-transparent outline-none text-sm font-light'
                                    />
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <input
                                        placeholder='User email'
                                        value={user.email}
                                        onChange={() => console.log('changed')}
                                        className='bg-transparent outline-none text-sm font-light'
                                    />
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <input
                                        placeholder='User balance'
                                        value={user.balance}
                                        onChange={() => console.log('changed')}
                                        className='bg-transparent outline-none text-sm font-light'
                                    />
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <input
                                        placeholder='User role'
                                        value={user.elevation}
                                        onChange={() => console.log('changed')}
                                        className='bg-transparent outline-none text-sm font-light'
                                    />
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <button className='bg-red-900 py-1 px-3 rounded-lg text-sm' >
                                        Delete
                                    </button>
                                </motion.td>

                            </motion.tr>

                        ))
                    }


                </Table>
            </section>
        </Layout>
    );
}