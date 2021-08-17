import React from 'react';
import { motion } from 'framer-motion';

import { Navigation } from '../components/Navigation';

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

export default function Explore() {
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
                        Track your <span className='gradient-text' >cryptocurrency<br />portfolio</span> in realtime
                    </h1>
                    <p className='text-gray-700' >Manage your every coin and transaction with ease</p>

                </motion.section>
            </main>
        </>
    );
}