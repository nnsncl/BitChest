import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import Navigation from '../components/Navigation';
import { ButtonGhost } from '../components/Button';
import { GraphUp, GraphDown } from '../components/Icons';
// import Table from '../components/Table/Table';


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
}

const article = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    }
}

export default function Wallet() {
    const [topCoinsVisible, setTopCoinsVisible] = useState(true);
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
        <main className='text-white md:flex md:h-screen h-full p-6' >
            <Navigation />
            <motion.section
                initial='hidden'
                animate='visible'
                variants={container}
                className='md:py-10 py-9 md:px-12 px-6 w-full'>
                <div className='flex items-start justify-between gap-6' >
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>
                            <span className='gradient-text' >Today's</span> most profitable Coins
                        </h1>
                        <p className='text-gray-700' >The most profitable cryptocurrencies</p>
                    </div>
                    <ButtonGhost onClick={() => setTopCoinsVisible(!topCoinsVisible)}>
                        <b>:</b>
                    </ButtonGhost>
                </div>
                {
                    topCoinsVisible
                    && <motion.section
                        initial='hidden'
                        animate='visible'
                        variants={container}
                        className='mt-12 flex flex-wrap gap-10' >
                        {
                            topCoins &&
                            topCoins.map((item) => (
                                <motion.article
                                    key={item.id}
                                    variants={article}
                                    exit={article.hidden}
                                    className="flex items-center gap-3 md:w-56 w-full">
                                    <span className='text-gray-700 text-xs font-bold'>{item.market_cap_rank}</span>
                                    <img className='w-10 h-10 bg-transparent rounded-full' src={item.image} alt={`${item.name}-logo`} />
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
                                </motion.article>
                            ))
                        }
                    </motion.section>
                }
            </motion.section>

            {/* <Table /> */}
        </main>
    );
}