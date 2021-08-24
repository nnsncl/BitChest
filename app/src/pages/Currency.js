import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

import { getSessionTokenCookie } from "../constants/session-storage-endpoints";

export default function Currency() {
    const auth = useAuth();
    const { id } = useParams();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (getSessionTokenCookie && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <h1 className='text-3xl font-bold mb-2'>{id}</h1>
            {/* <p className='text-gray-700' >Your personnal informations and transations activity summary</p> */}
        </Layout>
    );
}