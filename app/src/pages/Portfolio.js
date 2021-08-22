import React, { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';
import { getSessionTokenCookie } from '../constants/session-storage-endpoints';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

export default function Portfolio() {
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (getSessionTokenCookie && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>Your cryptocurrency portfolio</h1>
            <p className='text-gray-700' >Manage your every coin with ease</p>
        </Layout>
    );
}