import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import * as ROUTES from '../../routes/routes';

import { useAuth } from '../../hooks/use-auth';
import { useRouter } from '../../hooks/use-router';

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

    const error = auth.error;

    useEffect(() => {
        (auth.storedUser.id) && router.push(ROUTES.MARKETPLACE);
        auth.pending && setIsLoginPending(!isLoginPending);
        //eslint-disable-next-line
    }, [auth])

    const handleLogin = (event) => {
        event.preventDefault();
        auth.login(userEmail, userPassword);
    }

    return (
        <>
            <main className='text-white p-6 relative h-screen flex flex-col items-center justify-center' >
                <header className='w-full flex items-center justify-center absolute top-9' >
                    <p className='text-sm text-white'>Bit<b>Chest</b></p>
                </header>
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex flex-col justify-center items-center px-6 py-9 '>
                    <div>
                        <h1 className='text-3xl font-bold mb-12 text-center'>Log in to access your<br /><span className='gradient-text' >cryptocurrencies portfolio</span></h1>
                        <form className='flex flex-col md:w-96 w-full' onSubmit={(event) => handleLogin(event)} >
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
                            <button
                            disabled={(!userEmail || !userPassword) || (!userEmail && !userPassword)}
                            className='disabled:opacity-30 uppercase text-xs flex items-center justify-center font-bold bg-blue-900 py-3 px-12 rounded-lg transition duration-300 ease-in-out outline-none' >
                                {
                                    isLoginPending
                                        ? <Processing />
                                        : 'Log in'
                                }
                            </button>
                        </form>
                    </div>
                </motion.section>
            </main>
        </>
    );
}