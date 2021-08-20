import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export const ButtonLink = ({ to, active, children }) => {
    return (
        <Link to={to} className={`text-sm transition duration-300 ease-in-out outline-none ${active ? 'text-white' : 'text-gray-700'} font-medium hover:text-white`}>
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
            className='px-4 py-2 border-2 border-gray-800 rounded-xl font-bold outline-none text-sm'
            onClick={onClick}>
            {children}
        </motion.button>
    );
}

export const ButtonSecondary = ({ to, active, children }) => {
    return (
        <Link to={to} className={`bg-blue-900 text-xs text-white py-3 md:px-6 px-3 rounded-lg`} >
            {children}
        </Link>
    );
}
export const ButtonTertiary = ({ to, active, children }) => {
    return (
        <Link to={to} className={`${active ? 'bg-gray-800' : 'bg-transparent'} text-xs hover:bg-gray-800 border-2 border-gray-800 ptext-white py-3 md:px-6 px-3 rounded-lg transition duration-300 ease-in-out outline-none`} >
            {children}
        </Link>
    );
}