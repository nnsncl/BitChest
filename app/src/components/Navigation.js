import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import * as ROUTES from '../routes/routes';

import { useRouter } from '../hooks/use-router';
import { useAuth } from '../hooks/use-auth';

import { ButtonLink, ButtonTertiary } from './Buttons';
import { Signout, Processing } from './Icons';

import { list, item } from '../animations/motion';


export const Navigation = () => {
    const auth = useAuth();
    const router = useRouter();

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isLogoutPending, setIsLogoutPending] = useState(false);

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    const handleLogout = () => {
        setIsLogoutPending(!isLogoutPending);
        auth.logout();
    }

    return (
        <>
            <nav className='w-full bg-filter--blur z-10 pt-2 pb-6' >
                <div className='w-full flex-row flex items-center justify-between  text-white' >
                    <div className='flex items-center gap-4' >
                        <p className='text-sm sm:inline-block hidden'>Bit<b>Chest</b></p>
                        <ul className='flex items-center gap-4 pl-0 sm:gap-6 sm:pl-6 sm:border-l-2 sm:border-gray-800'>
                            <li className="flex items-center" >
                                <ButtonLink active={router.pathname === ROUTES.MARKETPLACE} to={ROUTES.MARKETPLACE}>
                                    Marketplace
                                </ButtonLink>
                            </li>
                            {auth.user &&
                                <li className="flex items-center" >
                                    <ButtonLink active={router.pathname === ROUTES.USER_ACTIVITY} to={ROUTES.USER_ACTIVITY}>
                                        Activity
                                    </ButtonLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="flex items-center w-full justify-end" >
                        <ul className='flex items-center justify-center sm:gap-6 gap-4'>
                            {auth.user
                                ? <>
                                    <li className="flex items-center" >
                                        <ButtonTertiary to={ROUTES.USER_PORTFOLIO} >Portfolio</ButtonTertiary>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <button
                                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                                            className={`flex flex items-center gap-1 text-gray-700 hover:text-white ${isDropdownVisible && 'text-white'} transition  ease-in-out relative`}>
                                            <div className='w-10 h-10 rounded-lg bg-transparent border-2 border-gray-800 overflow-hidden' >
                                                <img className='w-full h-full' src={auth.user.elevation === 'admin' ? '/avatar_admin.jpg' : '/avatar.jpg'} alt='' />
                                            </div>
                                            <small className={`sm:inline-block hidden text-base origin-center transform transition ${isDropdownVisible ? '-rotate-90 text-white' : 'rotate-90'} ease-in-out`} >
                                                &#x2023;
                                            </small>
                                        </button>
                                        {isDropdownVisible &&
                                            <motion.div
                                                initial="hidden"
                                                animate="visible"
                                                variants={list}
                                                className='rounded-lg flex flex-col w-52 p-4 gap-2 bg-gray-900 border-2 border-gray-800 absolute -bottom-60 right-6' >
                                                <div className='flex items-center gap-3 mb-3 pb-3 border-b-2 border-gray-800' >
                                                    <div className='w-10 h-10 rounded-lg bg-transparent rounded-lg border-2 border-gray-800 overflow-hidden' >
                                                        <img className='w-full h-full' src={auth.user.elevation === 'admin' ? '/avatar_admin.jpg' : '/avatar.jpg'} alt='' />
                                                    </div>
                                                    <div>
                                                        <p className='text-xs font-bold capitalize' >{auth?.user?.name}</p>
                                                        <p className='text-xs text-gray-700' >{auth?.user?.email}</p>
                                                    </div>
                                                </div>
                                                {auth.user && auth.user.elevation === 'admin'
                                                    ? <ButtonLink active={router.pathname === ROUTES.ADMIN} to={ROUTES.ADMIN}>Admin</ButtonLink>
                                                    : null
                                                }
                                                <motion.p variants={item} className='text-sm text-gray-700' >Account</motion.p>
                                                <motion.p variants={item} className='text-sm text-gray-700 mb-3 pb-5 border-b-2 border-gray-800' >Help center</motion.p>
                                                <motion.button variants={item} onClick={() => handleLogout()} className='w-full flex justify-between items-center text-sm text-white'>
                                                    <span>Sign out of Bit<b>Chest</b></span>
                                                    {isLogoutPending
                                                        ? <Processing />
                                                        : <Signout />
                                                    }
                                                </motion.button>
                                            </motion.div>
                                        }
                                    </li>
                                </>
                                : <ButtonTertiary to={ROUTES.LOGIN} >Log in</ButtonTertiary>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}