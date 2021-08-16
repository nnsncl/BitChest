import React from 'react';
import Navigation from '../components/Navigation';
import { GraphUp, GraphDown } from '../components/Icons';
// import Table from '../components/Table/Table';


const currencies = [
    {
        name: 'Bitcoin',
        slug: 'BTC',
        price: '$5,849.56',
        position: '1',
        profit: true,
    },
    {
        name: 'Ethereum',
        slug: 'ETH',
        price: '$5,849.56',
        position: '2',
        profit: true,
    },
    {
        name: 'Ripple',
        slug: 'RPL',
        price: '$5,849.56',
        position: '3',
        profit: false,
    },
    {
        name: 'Bitcoin Cash',
        slug: 'BTCC',
        price: '$5,849.56',
        position: '4',
        profit: false,
    },
    {
        name: 'Cardano',
        slug: 'CDN',
        price: '$5,849.56',
        position: '5',
        profit: true,
    },
    {
        name: 'NEM',
        slug: 'NEM',
        price: '$5,849.56',
        position: '6',
        profit: true,
    },
    {
        name: 'Stellar',
        slug: 'SLR',
        price: '$5,849.56',
        position: '7',
        profit: false,
    },
    {
        name: 'IOTA',
        slug: 'OTA',
        price: '$5,849.56',
        position: '8',
        profit: true,
    },
    {
        name: 'Litcoin',
        slug: 'LTC',
        price: '$5,849.56',
        position: '9',
        profit: false,
    },
    {
        name: 'Dash',
        slug: 'DSH',
        price: '$5,849.56',
        position: '10',
        profit: false,
    }
]

export default function Wallet() {
    return (
        <main className='bg-gray-900 text-white md:flex md:h-screen h-full p-6' >
            <Navigation />
            <section className='md:py-10 py-9 md:px-12 px-6'>
                <h1 className='text-3xl font-bold'>
                    <span className='gradient-text' >Top</span> currencies of <span className='gradient-text' >this week</span>
                </h1>
                <p className='text-gray-700' >The most profitable cryptocurrencies</p>
                <section className='mt-12 flex flex-wrap gap-8' >
                    {
                        currencies.map((item) => (
                            <article
                                key={item.slug}
                                className="flex items-center gap-3 md:w-56 w-full">
                                <span className='text-gray-700 text-xs font-bold'>{item.position}</span>
                                <div className='w-14 h-14 bg-gray-700 rounded-full' ></div>
                                <div>
                                    <p className='flex-1 flex items-center justify-between gap-3 text-sm font-bold uppercase' >
                                        {item.name}
                                        {
                                            item.profit
                                                ? <GraphUp />
                                                : <GraphDown />
                                        }
                                    </p>
                                    <small className='text-gray-700 text-xs'>
                                        {item.price}
                                    </small>
                                </div>
                            </article>
                        ))
                    }
                </section>
            </section>
            {/* <Table /> */}
        </main>
    );
}