import React, { useEffect } from 'react';

import { useAuth } from '../../hooks/use-auth';

import { Layout } from '../../components/Layout';
import { Loader } from '../../components/Loader';

import { getSessionTokenCookie } from "../../constants/session-storage-endpoints";

export default function Admin() {
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (getSessionTokenCookie && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>Hi, {auth.user && auth.user.name}</h1>
            <p className='text-gray-700' >Create, delete and edit users informations.</p>
        </Layout>
    );
}