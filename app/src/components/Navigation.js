import React from 'react';
import { motion } from "framer-motion"

import { ButtonLink } from './Button';
import * as ROUTES from '../constants/routes';


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
            className='rounded-xl text-white bg-gray-800 flex items-center justify-between w-full md:w-32 md:flex-col flex-row md:py-12 py-3 md:px-3 px-6' >
            <span className='text-sm md:block hidden'>Bit<b>Chest</b></span>
            <ul className='flex md:h-full md:flex-col flex-row md:gap-0 gap-3'>
                <motion.li variants={item} className='md:mt-16 mt-0 text-center' >
                    <ButtonLink to={ROUTES.HOME}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" >
                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4 4.5L11.6314 3.06911C11.875 3.02343 12.125 3.02343 12.3686 3.06911L20 4.5V12.4033C20 16.196 18.0462 19.7211 14.83 21.7313L12.53 23.1687C12.2057 23.3714 11.7943 23.3714 11.47 23.1687L9.17001 21.7313C5.95382 19.7211 4 16.196 4 12.4033L4 4.5Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.5 11C9.5 9.61929 10.6194 8.5 12 8.5C13.3806 8.5 14.5 9.61929 14.5 11V11.5C15.0522 11.5 15.5 11.9477 15.5 12.5V15.5C15.5 16.0523 15.0522 16.5 14.5 16.5H9.5C8.94775 16.5 8.5 16.0523 8.5 15.5V12.5C8.5 11.9477 8.94775 11.5 9.5 11.5V11ZM12 9.5C11.1716 9.5 10.5 10.1716 10.5 11V11.5H13.5V11C13.5 10.1716 12.8284 9.5 12 9.5Z" fill="white" />
                        </svg>
                    </ButtonLink>
                </motion.li>
                <motion.li variants={item} className='md:mt-8 mt-0 text-center' >
                    <ButtonLink to={ROUTES.ADMIN}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 5C9.67163 5 9 5.67163 9 6.5V9.5C9 10.3284 9.67163 11 10.5 11H20.5C21.3284 11 22 10.3284 22 9.5V6.5C22 5.67163 21.3284 5 20.5 5H10.5ZM10.5 13C9.67163 13 9 13.6716 9 14.5V17.5C9 18.3284 9.67163 19 10.5 19H20.5C21.3284 19 22 18.3284 22 17.5V14.5C22 13.6716 21.3284 13 20.5 13H10.5Z" fill="white" />
                            <rect opacity="0.3" x="2" y="5" width="5" height="14" rx="1" fill="white" />
                        </svg>
                    </ButtonLink>
                </motion.li>
                <motion.li variants={item} className='md:mt-8 mt-0 text-center' >
                    <ButtonLink to={ROUTES.ADMIN}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4.25195 14C5.14014 17.4504 8.27246 20 12 20C16.4182 20 20 16.4182 20 12C20 7.92041 16.9463 4.5542 13 4.06201V14H4.25195Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9983 10V3C6.9187 3 3.55249 6.05371 3.0603 10H10.9983Z" fill="white" />
                        </svg>
                    </ButtonLink>
                </motion.li>
                <motion.li variants={item} className='md:mt-8 mt-0 text-center' >
                    <ButtonLink to={ROUTES.ADMIN}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 11H5.5C4.67157 11 4 11.6716 4 12.5V13H8.58579C8.851 13 9.10536 13.1054 9.29289 13.2929L10.2929 14.2929C10.7456 14.7456 11.3597 15 12 15C12.6403 15 13.2544 14.7456 13.7071 14.2929L14.7071 13.2929C14.8946 13.1054 15.149 13 15.4142 13H20V12.5C20 11.6716 19.3284 11 18.5 11Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 6C4.67157 6 4 6.67157 4 7.5V8H20V7.5C20 6.67157 19.3284 6 18.5 6H5.5Z" fill="white" />
                        </svg>
                    </ButtonLink>
                </motion.li>
            </ul>
            <ul>
                <motion.li variants={item} className='text-center' >
                    <ButtonLink to={ROUTES.ADMIN}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                            <path opacity="0.3" d="M14.0008 7C14.0008 7.55229 14.4483 8 15.0003 8C15.5524 8 15.9999 7.55229 15.9999 7V6C15.9999 3.79086 14.2098 2 12.0016 2H6.0051C3.79692 2 2.00684 3.79086 2.00684 6L2.00684 18C2.00684 20.2091 3.79692 22 6.0051 22H12.0086C14.2168 22 16.0068 20.2091 16.0068 18V17C16.0068 16.4477 15.5593 16 15.0073 16C14.4552 16 14.0077 16.4477 14.0077 17V18C14.0077 19.1046 13.1127 20 12.0086 20H6.0051C4.90101 20 4.00597 19.1046 4.00597 18L4.00597 6C4.00597 4.89543 4.90101 4 6.0051 4H12.0016C13.1057 4 14.0008 4.89543 14.0008 6V7Z" fill="white" />
                            <rect opacity="0.3" x="20" y="11" width="2" height="12" rx="1" transform="rotate(90 20 11)" fill="white" />
                            <path d="M17.2929 9.70711C16.9024 9.31658 16.9024 8.68342 17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071C16.9024 15.3166 16.9024 14.6834 17.2929 14.2929L19.5858 12L17.2929 9.70711Z" fill="white" />
                        </svg>
                    </ButtonLink>
                </motion.li>
            </ul>
        </motion.nav>
    );
}