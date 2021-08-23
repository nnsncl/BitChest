import React from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '../hooks/use-auth';

import { Banner } from './Banner';
import { Navigation } from './Navigation';
import { Swap } from './Icons';

import { container } from '../animations/motion';

export const Layout = ({ children }) => {
    const auth = useAuth();

    return (
        <>
            <main className='relative text-white max-w-screen-2xl flex flex-col mx-auto sm:px-12 px-4' >
                <Banner />
                <Navigation />
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex justify-center flex-col md:py-10 py-9 w-full'>
                    {children}
                </motion.section>
                <footer className='w-full py-9 flex items-center justify-between rounded-xl text-gray-700 text-xs ' >
                    <p className='text-sm text-white'>©&nbsp;Bit<b>Chest</b>&nbsp;2021</p>
                    <p className='text-xs '>Take a 👀 at the <a className='font-bold text-white' href='https://github.com/nnsncl/BitChest' target='_blank' rel="noreferrer">source code</a></p>
                </footer>
                {auth.user &&
                    <button className='flex items-center gap-2 bg-blue-900 text-sm py-3 px-6 rounded-lg fixed bottom-6 right-6' >
                        <Swap />
                        {auth.user.balance}€
                    </button>
                }
            </main>
        </>
    );
}