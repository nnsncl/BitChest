import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Link } from "react-router-dom";
import * as ROUTES from '../../routes/routes';

import { useAuth } from '../../hooks/use-auth';
import { useRouter } from '../../hooks/use-router';

import { SESSION_TOKEN } from '../../constants/session-storage-endpoints';

import { Processing } from '../../components/Icons';


const container = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    },
    hidden: {
        opacity: 0
    },
};

export default function Login() {
    const auth = useAuth();
    const router = useRouter();

    const [isLoginPending, setIsLoginPending] = useState(false);
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();

    const error = auth.error

    useEffect(() => {
        (auth.user || SESSION_TOKEN) && router.push(ROUTES.MARKETPLACE);
        auth.pending && setIsLoginPending(!isLoginPending);
        //eslint-disable-next-line
    }, [auth])

    const handleLogin = (event) => {
        event.preventDefault();
        auth.login(userEmail, userPassword);
    }

    return (
        <>
            <main className='text-white flex relative gap-36' >
                <header style={{ backgroundImage: 'url(/132.jpg)' }} className="hidden md:flex side-hero-section w-96 h-screen p-6 items-start fixed left-0 bottom-0" >
                    <p className='text-sm text-white items-center'>Bit<b>Chest</b></p>
                </header>
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex flex-col justify-center w-ful px-6 py-9 h-screen justify-center'>
                    <Link className='mb-6 text-sm font-bold' to={ROUTES.MARKETPLACE} >&larr;&nbsp;Go back</Link>
                    <h1 className='text-3xl font-bold mb-12'>Log in to access your<br /><span className='gradient-text' >cryptocurrencies portfolio</span></h1>
                    <form onSubmit={(event) => handleLogin(event)} >
                        {error &&
                            <div className='bg-red-900 p-3 mb-6 rounded-lg' >
                                <h6 className='font-bold mb-1' >Something went wrong</h6>
                                <p className='text-sm' >{error}</p>
                            </div>
                        }
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label className='text-xs font-bold mb-2' >Email</label>
                            <input
                                type='email'
                                placeholder=''
                                defaultValue=''
                                onChange={(e) => setUserEmail(e.target.value)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label className='text-xs font-bold mb-2' >Password</label>
                            <input
                                type='password'
                                placeholder=''
                                defaultValue=''
                                onChange={(e) => setUserPassword(e.target.value)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <button className='text-xs font-bold bg-blue-900 py-3 px-12 rounded-lg transition duration-300 ease-in-out outline-none' >
                            {
                                isLoginPending
                                    ? <Processing />
                                    : 'Log in'
                            }
                        </button>
                    </form>
                </motion.section>
            </main>
        </>
    );
}