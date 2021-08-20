import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '../hooks/use-auth';
import { getSessionTokenCookie } from '../constants/session-storage-endpoints';

import { Navigation } from '../components/Navigation';
import { Loader } from '../components/Loader';

const container = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    },
    hidden: {
        opacity: 0
    },
}

export default function Marketplace() {
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if (getSessionTokenCookie && !auth.user) {
        return <Loader />;
    }

    return (
        <>
            <Navigation />
            <main className='text-white md:h-screen max-w-screen-2xl flex flex-col mx-auto' >
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex justify-center flex-col md:py-10 py-9 w-full px-6 mt-20'>
                    <h1 className='text-3xl font-bold mb-2'>
                        Buy and sell <span className='gradient-text' >trusted<br />cryptocurrency</span>
                    </h1>
                    <p className='text-gray-700' >Explore the cryptocurrency world, buy and sell trusted coins with ease</p>

                </motion.section>
            </main>
        </>
    );
}