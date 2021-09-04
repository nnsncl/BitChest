import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes/routes';

import { USER_ROLES } from '../../constants/user';

import { Processing } from '../../components/Icons';
import { useAuth } from '../../hooks/use-auth';

export default function EditUser() {
    const auth = useAuth();

    const [user, setUser] = useState({
        name: auth.storedUser.name,
        email: auth.storedUser.email,
        elevation: auth.storedUser.elevation
    });

    const error = auth.error;
    const pending = auth.pending;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdition = (e) => {
        e.preventDefault();
        auth.updateCurrentUser(auth.storedUser.id, user);
    };

    console.log(user);

    return (
        <main className='text-white p-6 relative h-screen flex flex-col items-center justify-center' >
            
            {user &&
                <section className='flex flex-col justify-center items-center px-6 py-9 '>
                    <div>
                        <Link className='text-xs py-3 px-6 border-2 border-gray-800 rounded-xl' to={ROUTES.MARKETPLACE} >&larr;&nbsp;Go back to marketplace</Link>
                        <h1 className='text-3xl font-bold my-9'>
                            <span className='gradient-text' >Edit</span> <span>your</span><br/>personal informations.
                        </h1>
                        <form className='flex flex-col md:w-96 w-full' onSubmit={(e) => handleEdition(e)} >
                            {error &&
                                <div className='bg-red-900 p-3 mb-6 rounded-lg' >
                                    <h6 className='font-bold mb-1' >Something went wrong</h6>
                                    <p className='text-sm' >{error}</p>
                                </div>
                            }
                            <fieldset className='border-0 flex flex-col mb-6' >
                                <label htmlFor='name' className='text-xs font-bold mb-2' >Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder=''
                                    defaultValue={auth.storedUser.name}
                                    onChange={(e) => handleChange(e)}
                                    className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                                />
                            </fieldset>
                            <fieldset className='border-0 flex flex-col mb-6' >
                                <label htmlFor='email' className='text-xs font-bold mb-2' >Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder=''
                                    defaultValue={auth.storedUser.email}
                                    onChange={(e) => handleChange(e)}
                                    className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                                />
                            </fieldset>
                            <fieldset className='border-0 flex flex-col mb-6' >
                                <label htmlFor='email' className='text-xs font-bold mb-2' >Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder=''
                                    onChange={(e) => handleChange(e)}
                                    className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                                />
                            </fieldset>
                            <fieldset className='border-0 flex flex-col mb-6' >
                                <label htmlFor='email' className='text-xs font-bold mb-2' >Confirm Password</label>
                                <input
                                    type='password'
                                    name='password_confirmation'
                                    placeholder=''
                                    onChange={(e) => handleChange(e)}
                                    className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                                />
                            </fieldset>
                            <button
                                disabled={user.name === '' || user.email === ''}
                                className='flex justify-center disabled:opacity-30 uppercase text-xs font-bold bg-blue-900 py-3 px-12 rounded-lg transition duration-300 ease-in-out outline-none' >
                                {pending
                                    ? <Processing />
                                    : 'Edit User'
                                }
                            </button>
                        </form>
                    </div>

                </section>
            }
        </main>
    );
}