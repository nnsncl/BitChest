import React, { useEffect } from 'react';

import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

import { SESSION_TOKEN } from "../constants/session-storage-endpoints";

export default function Activity() {
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (SESSION_TOKEN && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>Your activity summary</h1>
            <p className='text-gray-700' >Your personnal informations and transations activity summary</p>
        </Layout>
    );
}