import React from 'react';
import Navigation from '../components/Navigation';
// import Table from '../components/Table/Table';


export default function Wallet() {
    return (
        <main className='bg-gray-900 text-white md:flex h-screen p-6' >
            <Navigation />
            <section className='md:py-10 py-9 md:px-12 px-6'>
                <h1 className='gradient-text text-3xl font-bold' >Dashboard</h1>
                <p className='text-gray-700' >Cryptocurrencies management</p>
            </section>

            {/* <Table /> */}
        </main>
    );
}