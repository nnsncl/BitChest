import React from 'react';
import { motion } from 'framer-motion';

import { Banner } from './Banner';
import { Navigation } from './Navigation';

import { container } from '../animations/motion';

export const Layout = ({ children }) => {
    return (
        <>
            <main className='text-white md:h-screen max-w-screen-2xl flex flex-col mx-auto' >
                <Banner />
                <Navigation />
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex justify-center flex-col md:py-10 py-9 w-full px-6'>

                    {children}
                </motion.section>
            </main>
        </>
    );
}