import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import * as ROUTES from '../constants/routes';

import { useRouter } from '../hooks/use-router';
import { useWindowSize } from '../hooks/use-window-size';
import { useAuth } from '../hooks/use-auth';

import { MEDIA_QUERIES_BREAKPOINTS } from '../constants/media-breakpoints';

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
    const auth = useAuth();
    const router = useRouter();
    const size = useWindowSize();
 
    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={list}
            className='fixed w-full flex-row text-white bg-filter--blur flex items-center justify-between px-6 py-6' >
            <p className='text-sm md:flex hidden items-center'>Bit<b>Chest</b></p>
            <div className="flex items-center w-full md:justify-end justify-between" >
                {auth.user && auth.user.elevation === 'admin'
                    ? <ul className='flex items-center gap-3 md:border-r-2 md:border-gray-800 mr-6 md:pr-6'>
                        <motion.li variants={item}>
                            <ButtonLink active={router.pathname === ROUTES.ADMIN} to={ROUTES.ADMIN}>
                                {size.width < MEDIA_QUERIES_BREAKPOINTS.md
                                    ? <SecureSpace />
                                    : 'Admin'
                                }
                            </ButtonLink>
                        </motion.li>
                    </ul>
                    : null
                }
                <ul className='flex items-center gap-6 border-r-2 border-gray-800 mr-6 pr-6'>
                    <motion.li variants={item}>
                        <ButtonLink active={router.pathname === ROUTES.EXPLORE} to={ROUTES.EXPLORE}>Explore</ButtonLink>
                    </motion.li>
                    {auth.user
                        ? <motion.li variants={item}>
                            <ButtonLink active={router.pathname === ROUTES.USER_ACTIVITY} to={ROUTES.USER_ACTIVITY}>Activity</ButtonLink>
                        </motion.li>
                        : null
                    }
                </ul>
                <ul className='flex items-center md:gap-3 gap-6'>
                    <motion.li variants={item} >
                        {size.width < MEDIA_QUERIES_BREAKPOINTS.md
                            ? <Link to={ROUTES.MARKETPLACE} >
                                <Market />
                            </Link>
                            : <ButtonSecondary active={router.pathname === ROUTES.MARKETPLACE} to={ROUTES.MARKETPLACE} >Marketplace</ButtonSecondary>
                        }
                    </motion.li>
                    <motion.li variants={item}>
                        {size.width < MEDIA_QUERIES_BREAKPOINTS.md
                            ? <Link to={ROUTES.USER_WALLET} >
                                <Wallet />
                            </Link>
                            : auth.user
                                ? <ButtonTertiary active={router.pathname === ROUTES.USER_WALLET} to={ROUTES.USER_WALLET} >{auth.user.balance}€</ButtonTertiary>
                                : <ButtonTertiary to={ROUTES.LOGIN} >Log in</ButtonTertiary>
                        }
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
}