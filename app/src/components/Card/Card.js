import React from 'react';

export default function Card() {
    return (
        <article className='text-white p-6 border-2 border-gray-800 rounded-xl w-full'>
            <header className='flex items-center gap-3 mb-3' >
                <span className='bg-gray-800 py-2 px-4 rounded-xl'>$</span>
                <h6 className='uppercase text-sm text-gray-700' >ETH/USDT</h6>
            </header>
            <p className="text-3xl font-medium mb-2" >$2,138.87</p>
            <p className="text-sm text-gray-700 ">+0,2%</p>
        </article>
    );
}