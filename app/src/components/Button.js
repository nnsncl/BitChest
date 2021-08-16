import React from 'react';
import { Link } from "react-router-dom";

export const Button = ({ to, children }) => {
    return (
        <Link to={to} className='p-3 rounded-lg transition duration-300 ease-in-out'>
            {children}
        </Link>
    );
};