import React from 'react';

import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

export default function Portfolio() {
    const auth = useAuth();

    if (!auth.storedUser) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>Your cryptocurrency portfolio</h1>
            <p className='text-gray-700' >Manage your every coin with ease</p>
        </Layout>
    );
}