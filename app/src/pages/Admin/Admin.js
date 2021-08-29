import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import * as ROUTES from '../../routes/routes';

import { useAuth } from '../../hooks/use-auth';
import { AdminContext } from '../../hooks/use-admin';

import { Layout } from '../../components/Layout';
import { ButtonSecondary, ButtonTertiary } from '../../components/Buttons';
// import { Loader } from '../../components/Loader';
import { Table } from '../../components/Table';

import { container, article } from '../../animations/motion';


export default function Admin() {
    const auth = useAuth();
    const admin = useContext(AdminContext);

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    // if (getSessionTokenCookie && !auth.user) {
    //     return <Loader />;
    // }


    return (
        <Layout>
            <header className='mb-12' >
                <h1 className='text-3xl font-bold mb-2'>Hi, {auth.user && auth.user.name}</h1>
                <p className='text-gray-700 mb-6' >Manage users informations and permissions.</p>
                <ButtonSecondary to={ROUTES.ADD_USER} >Create a new user</ButtonSecondary>
            </header>

            <section>
                <Table headings={
                    <>
                        <th className="w-1/3 text-left text-xs md:block hidden" >Name</th>
                        <th className="w-1/3 text-left text-xs" >Email</th>
                        <th className="w-1/3 text-left text-xs md:block hidden" >Balance</th>
                        <th className="w-1/3 text-left text-xs md:block hidden" >Role</th>
                        <th className="w-1/3 text-left text-xs" ></th>
                    </>
                }>
                    {
                        admin.users && admin.users.map((user, key) => (
                            <motion.tr
                                key={key}
                                initial='hidden'
                                animate='visible'
                                variants={container}
                                className='flex items-center justify-between gap-3 text-white py-3 px-4 gap-6 border-b-2 border-gray-800'>

                                <motion.td variants={article} className='w-1/3 flex items-start gap-3 md:flex hidden' >
                                    <p className=' text-sm font-light'>{user.name}</p>
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                    <p className=' text-sm font-light'>{user.email}</p>
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 md:flex hidden items-start gap-3' >
                                    <p className=' text-sm font-light'>{user.balance}</p>
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 md:flex hidden items-start gap-3' >
                                    <p className=' text-sm font-light'>{user.elevation}</p>
                                </motion.td>
                                <motion.td variants={article} className='w-1/3 flex items-center gap-3' >
                                    <ButtonTertiary to={`${ROUTES.ADMIN}/user/${user.id}`}>
                                        Edit
                                    </ButtonTertiary>
                                    <button onClick={() => admin.actions.deleteUser(user.id)} className='text-red-900 text-sm' >
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