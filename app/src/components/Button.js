import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export const ButtonLink = ({ to, children }) => {
    return (
        <Link to={to} className='p-3 rounded-lg transition duration-300 ease-in-out outline-none'>
            {children}
        </Link>
    );
};

export const ButtonGhost = ({ onClick, children }) => {

    return (
        <motion.button
            whileHover={{
                scale: 1.2,
                rotate: '90deg'
            }}
            whileTap={{
                scale: 0.9,
                rotate: '-90deg',
                borderRadius: '100%',
                transition: {
                    type: "spring",
                    mass: 2
                }
            }}
            className='px-4 py-2 border-2 border-gray-800 rounded-xl font-bold outline-none'
            onClick={onClick}>
            {children}
        </motion.button>
    );
}