import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import * as ROUTES from '../constants/routes';

import { useRouter } from '../hooks/use-router';
import { useAuth } from '../hooks/use-auth';

import { getSessionTokenCookie, getUserIDCookie } from "../constants/session-storage-endpoints";

import { ButtonLink, ButtonSecondary, ButtonTertiary } from './Button';
import { Wallet, Market, SecureSpace, Signout, Processing } from './Icons';


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

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isLogoutPending, setIsLogoutPending] = useState(false);

    useEffect(() => {
        if (getUserIDCookie && getSessionTokenCookie) {
            auth.getAuthUser();
        }
        return;
    }, [auth])

    const handleLogout = () => {
        setIsLogoutPending(!isLogoutPending);
        auth.logout();
    }

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="visible"
                variants={list}
                className='w-full bg-filter--blur' >
                <div className='w-full flex-row flex items-center justify-between px-6 py-6 ' >
                    <div className='flex items-center gap-6' >
                        <p className='text-sm'>Bit<b>Chest</b></p>
                        <ul className='flex items-center gap-6 border-l-2 border-gray-800 pl-6'>
                            <motion.li variants={item}>
                                <ButtonLink active={router.pathname === ROUTES.EXPLORE} to={ROUTES.EXPLORE}>Explore</ButtonLink>
                            </motion.li>
                            {auth.user
                                ? <motion.li variants={item}>
                                    <ButtonLink active={router.pathname === ROUTES.USER_ACTIVITY} to={ROUTES.USER_ACTIVITY}>Activity</ButtonLink>
                                </motion.li>
                                : null
                            }
                            {auth.user && auth.user.elevation === 'admin'
                                ? <motion.li variants={item}>
                                    <ButtonLink active={router.pathname === ROUTES.ADMIN} to={ROUTES.ADMIN}>Admin</ButtonLink>
                                </motion.li>
                                : null
                            }
                        </ul>
                    </div>

                    <div className="flex items-center w-full justify-end" >
                        <ul className='flex items-center justify-center gap-6'>
                            <motion.li variants={item} >
                                <ButtonSecondary active={router.pathname === ROUTES.MARKETPLACE} to={ROUTES.MARKETPLACE} >Marketplace</ButtonSecondary>
                            </motion.li>
                            <motion.li variants={item}>
                                { auth.user
                                    ? <ButtonTertiary active={router.pathname === ROUTES.USER_WALLET} to={auth.user ? ROUTES.USER_WALLET : ROUTES.LOGIN} >Portfolio</ButtonTertiary>
                                    : <ButtonTertiary to={ROUTES.LOGIN} >Log in</ButtonTertiary>
                                }
                            </motion.li>
                            {auth.user &&
                                <motion.li variants={item} className='flex flex-col items-center' >
                                    <button
                                        onMouseEnter={() => setIsDropdownVisible(true)}
                                        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                                        className='flex flex items-center gap-1 text-gray-700 hover:text-white  transition duration-300 ease-in-out relative'>
                                        <div className='w-9 h-9 bg-transparent rounded-full border-2 border-gray-800 overflow-hidden' >
                                            <img className='w-full h-full' src='/132.jpg' alt='' />
                                        </div>
                                        <small className={`text-base origin-center transform transition ${isDropdownVisible ? '-rotate-90 text-white' : 'rotate-90'} duration-300 ease-in-out`} >&#x2023;</small>
                                    </button>
                                    {isDropdownVisible &&
                                        <motion.div onMouseLeave={() => setIsDropdownVisible(false)} className='rounded-lg flex flex-col w-52 p-4 gap-2 bg-filter--blur border-2 border-gray-800 absolute -bottom-48 right-6' >
                                            <p className='text-sm text-gray-700 mb-3 pb-3 border-b-2 border-gray-800' >Change profile</p>
                                            <p className='text-sm text-gray-700' >Account</p>
                                            <p className='text-sm text-gray-700 mb-3 pb-3 border-b-2 border-gray-800' >Help center</p>
                                            <button onClick={() => handleLogout()} className='w-full flex justify-between items-center text-sm text-white transition duration-300 ease-in-out '>
                                                <span>Sign out of Bit<b>Chest</b></span>
                                                {
                                                    isLogoutPending
                                                        ? <Processing />
                                                        : <Signout />
                                                }
                                            </button>
                                        </motion.div>
                                    }
                                </motion.li>
                            }
                        </ul>
                    </div>

                </div>

            </motion.nav>
        </>
    );
}