import React from 'react';
import { motion } from "framer-motion"

import * as ROUTES from '../constants/routes';

import { ButtonLink, ButtonSecondary, ButtonTertiary } from './Button';


const list = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            staggerChildren: 0.13,
        },
    },
}

const item = {
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            mass: 1.3,
            bounce: 0.3,
            duration: 0.1
        },
    },
    hidden: {
        opacity: 0,
        x: -100,
        scale: 0,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    }
}
export const Navigation = () => {
    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={list}
            className='fixed w-full flex-row text-white bg-filter--blur flex items-center justify-between px-6 py-3' >
            <p className='text-sm flex items-center'>
                Bit<b>Chest</b>
            </p>
            <div className="flex items-center" >
                <ul className='flex items-center gap-3 border-r-2 border-gray-800 mr-6 pr-3'>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.ADMIN}>Admin</ButtonLink>
                    </motion.li>
                </ul>
                <ul className='flex items-center gap-3 border-r-2 border-gray-800 mr-6 pr-3'>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.EXPLORE}>Explore</ButtonLink>
                    </motion.li>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.USER_ACTIVITY}>Activity</ButtonLink>
                    </motion.li>
                </ul>
                <ul className='flex items-center gap-3'>
                    <motion.li variants={item} >
                        <ButtonSecondary to={ROUTES.MARKETPLACE} >Marketplace</ButtonSecondary>
                    </motion.li>
                    <motion.li variants={item}>
                        <ButtonTertiary to={ROUTES.USER_WALLET} >564.32€</ButtonTertiary>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
}