import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes/routes';

import { AdminContext } from '../../hooks/use-admin';

import { USER_ROLES } from '../../constants/user';

import { Processing } from '../../components/Icons';

export default function EditUser() {
    const admin = useContext(AdminContext);
    const { id } = useParams();

    const [user, setUser] = useState({});

    const error = admin.actions.error;
    const pending = admin.actions.pending;

    useEffect(() => {
        const users = admin.actions.storedUsers;
        const user = users.filter(user => user.id === parseInt(id));
        setUser(user[0])
        //eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdition = (e) => {
        e.preventDefault();
        admin.actions.updateUser(id, user);
    };

    return (
        <main className='text-white flex relative gap-12' >
            {user &&
                <section className='flex flex-col items-center md:w-1/3 w-full mx-auto justify-center px-6 py-9 h-screen'>
                    <div className='w-full flex flex-col items-start'>
                        <Link className='mb-3 text-sm font-bold' to={ROUTES.ADMIN} >&larr;&nbsp;Go back to admin</Link>
                        <h1 className='text-3xl font-bold mb-9'>
                            <span className='gradient-text' >Edit</span> <span className='capitalize'>{user.name}</span>'s<br />personal informations.
                        </h1>
                    </div>
                    <form className='w-full' onSubmit={(e) => handleEdition(e)} >
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
                                defaultValue={user.name}
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
                                defaultValue={user.email}
                                onChange={(e) => handleChange(e)}
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            />
                        </fieldset>
                        <fieldset className='border-0 flex flex-col mb-6' >
                            <label htmlFor='elevation-select' className='text-xs font-bold mb-2' >Elevation</label>
                            <select
                                onChange={(e) => handleChange(e)}
                                defaultValue={user.elevation}
                                name='elevation'
                                id="elevation-select"
                                className='rounded-lg border-2 border-gray-800 hover:bg-gray-800 focus:bg-gray-800 bg-transparent py-3 px-3 outline-none text-sm transition duration-300 ease-in-out'
                            >
                                <option value="" disabled >--Please choose an option--</option>
                                {USER_ROLES.map((role, key) => (
                                    <option
                                        key={key}
                                        className='capitalize'
                                        defaultValue={role}
                                        selected={role === user.elevation}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        <button className='text-xs font-bold bg-blue-900 py-3 px-12 rounded-lg transition duration-300 ease-in-out outline-none' >
                            {pending
                                ? <Processing />
                                : 'Edit User'
                            }
                        </button>
                    </form>
                </section>
            }
        </main>
    );
}