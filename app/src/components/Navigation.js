import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

import * as ROUTES from '../constants/routes';
import { UserContext } from '../hooks/use-user';
import { useWindowSize } from '../hooks/use-window-size'

import { ButtonLink, ButtonSecondary, ButtonTertiary } from './Button';
import { Wallet, Market, SecureSpace } from './Icons';


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
        transition: {
            type: 'spring',
            duration: 0.3
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05
        },
    }
}
export const Navigation = () => {
    const size = useWindowSize();
    const { user } = useContext(UserContext);
    const user_funds = user.available_funds;

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={list}
            className='fixed w-full flex-row text-white bg-filter--blur flex items-center justify-between px-6 py-3' >
            <p className='text-sm md:flex hidden items-center'>Bit<b>Chest</b></p>
            <div className="flex items-center w-full md:justify-end justify-between" >
                <ul className='flex items-center gap-3 md:border-r-2 md:border-gray-800 mr-3 md:pr-3'>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.ADMIN}>
                            {size.width < 768
                                ? <SecureSpace />
                                : 'Admin'
                            }
                        </ButtonLink>
                    </motion.li>
                </ul>
                <ul className='flex items-center gap-3 border-r-2 border-gray-800 md:mr-6 mr-3 pr-3'>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.EXPLORE}>Explore</ButtonLink>
                    </motion.li>
                    <motion.li variants={item}>
                        <ButtonLink to={ROUTES.USER_ACTIVITY}>Activity</ButtonLink>
                    </motion.li>
                </ul>
                <ul className='flex items-center md:gap-3 gap-6'>
                    <motion.li variants={item} >
                        {size.width < 768
                            ? <Link to={ROUTES.MARKETPLACE} >
                                <Market />
                            </Link>
                            : <ButtonSecondary to={ROUTES.MARKETPLACE} >Marketplace</ButtonSecondary>
                        }
                    </motion.li>
                    <motion.li variants={item}>
                        {size.width < 768
                            ? <Link to={ROUTES.USER_WALLET} >
                                <Wallet />
                            </Link>
                            : <ButtonTertiary to={ROUTES.USER_WALLET} >{user_funds}€</ButtonTertiary>
                        }
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
}