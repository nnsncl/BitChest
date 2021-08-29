import React, { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';
import { SESSION_TOKEN } from '../constants/session';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

export default function Portfolio() {
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (SESSION_TOKEN && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>Your cryptocurrency portfolio</h1>
            <p className='text-gray-700' >Manage your every coin with ease</p>
        </Layout>
    );
}