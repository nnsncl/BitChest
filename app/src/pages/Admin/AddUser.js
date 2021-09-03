import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";

import * as ROUTES from '../../routes/routes';
import { AdminContext } from '../../hooks/use-admin';

import { BASE_USER } from '../../constants/user';

import { Processing } from '../../components/Icons';


export default function AddUser() {
    const admin = useContext(AdminContext);
    const [user, setUser] = useState(BASE_USER);

    const error = admin.actions.error;
    const pending = admin.actions.pending;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        admin.actions.createUser(user);
    };

    return (
        <main className='text-white p-6 relative h-screen flex flex-col items-center justify-center' >
            <header className='w-full flex items-center justify-center absolute top-9' >
                <p className='text-sm text-white'>Bit<b>Chest</b></p>
            </header>
            <section className='flex flex-col justify-center items-center px-6 py-9 '>
                <div>
                    <Link className='text-xs py-3 px-6 border-2 border-gray-800 rounded-xl' to={ROUTES.ADMIN} >&larr;&nbsp;Go back to admin</Link>
                    <h1 className='text-3xl font-bold my-9'>
                        <span className='gradient-text' >Create</span> a new user.
                    </h1>
                    <form className='flex flex-col md:w-96 w-full' onSubmit={(e) => handleRegistration(e)} >
                        {error &&
                            <div className='bg-red-900 p-3 mb-6 rounded-lg' >
                                <h6 className='font-bold mb-1' >Something went wrong</h6>
                                <p className='text-sm' >{error}</p>
                            </div>
                        }
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label htmlFor='name' className='text-xs font-bold mb-2' >Name</label>
                            <input
                                required
                                type='text'
                                name='name'
                                placeholder=''
                                defaultValue={user.name}
                                onChange={(e) => handleChange(e)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label htmlFor='email' className='text-xs font-bold mb-2' >Email</label>
                            <input
                                required
                                type='email'
                                name='email'
                                placeholder=''
                                defaultValue={user.email}
                                onChange={(e) => handleChange(e)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label htmlFor='password' className='text-xs font-bold mb-2' >Password</label>
                            <input
                                required
                                type='password'
                                name='password'
                                placeholder=''
                                defaultValue={user.password}
                                onChange={(e) => handleChange(e)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label htmlFor='password_confirmation' className='text-xs font-bold mb-2' >Confirm Password</label>
                            <input
                                required
                                type='password'
                                name='password_confirmation'
                                placeholder=''
                                defaultValue={user.password_confirmation}
                                onChange={(e) => handleChange(e)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <button
                            disabled={user.password.length < 8 || user.name === '' || user.email === ''}
                            className='disabled:opacity-30 uppercase text-xs font-bold bg-blue-900 py-3 px-12 rounded-lg transition duration-300 ease-in-out outline-none' >
                            {pending
                                ? <Processing />
                                : 'Create user'
                            }
                        </button>
                    </form>
                </div>

            </section>
        </main>
    );
}