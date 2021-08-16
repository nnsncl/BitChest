import React from 'react';

export const Button = ({ children }) => {
    return (
        <button className='p-3 rounded-lg bg-transparent hover:bg-gray-900 transition duration-300 ease-in-out'>
            {children}
        </button>
    );
};