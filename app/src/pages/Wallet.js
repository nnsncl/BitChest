import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { GraphUp, GraphDown } from '../components/Icons';
// import Table from '../components/Table/Table';


export default function Wallet() {

    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
            .then(function (response) {
                setTopCoins(response.data);
            })
            .catch(function (error) {
                console.error(error.message);
            })
    }, [])

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
                        topCoins &&
                        topCoins.map((item) => (
                            <article
                                key={item.id}
                                className="flex items-center gap-3 md:w-56 w-full">
                                <span className='text-gray-700 text-xs font-bold'>{item.market_cap_rank}</span>
                                <img className='w-12 h-12 bg-white rounded-full' src={item.image} alt={`${item.name}-logo`} />
                                <div>
                                    <p className='flex-1 flex items-center justify-between gap-3 text-sm font-bold uppercase' >
                                        {item.name}&nbsp;/&nbsp;{item.symbol}
                                        {
                                            item.price_change_percentage_24h > 0
                                                ? <GraphUp />
                                                : <GraphDown />
                                        }
                                    </p>
                                    <small className='text-gray-700 text-xs'>
                                        {item.current_price}
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