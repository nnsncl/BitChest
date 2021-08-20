import React from 'react'
import { motion } from 'framer-motion'


const loader = {
    visible: {
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -20, 0],
        transition: {
            type: 'spring',
            mass: 0.3,
            repeat: Infinity,
            duration: 1
        }
    }
};

export const Loader = () => {

    return (
        <motion.main className='bg-gray-900 h-screen w-screen flex flex-col gap-12 items-center justify-center overflow-hidden text-white' >
            <motion.div
                animate={loader.visible}
                className='gradient-bg w-2 h-2 bg-white rounded-full' />
        </motion.main>
    );
}