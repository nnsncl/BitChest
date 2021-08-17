import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { coingeckoEndpoints } from '../constants/api-endpoints';

import { Navigation } from '../components/Navigation';
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
        axios
            .all([
                coingeckoEndpoints.GET_BTC_SET,
                coingeckoEndpoints.GET_ETH_SET,
                coingeckoEndpoints.GET_XRP_SET,
                coingeckoEndpoints.GET_BCH_SET,
                coingeckoEndpoints.GET_ADA_SET,
                coingeckoEndpoints.GET_LTC_SET,
                coingeckoEndpoints.GET_XEM_SET,
                coingeckoEndpoints.GET_XLM_SET,
                coingeckoEndpoints.GET_MIOTA_SET,
                coingeckoEndpoints.GET_DASH_SET
            ])
            .then(
                axios.spread((...responses) => {
                    setTopCoins(responses)
                }))
            .catch(function (error) {
                console.error(error.message);
            })
    }, [])

    return (
        <main className='text-white md:flex md:h-screen h-full p-6' >
            {console.log(topCoins)}
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
                                    key={item.data[0].id}
                                    variants={article}
                                    exit={article.hidden}
                                    className="flex items-center gap-3 md:w-64 w-full">
                                    <span className='text-gray-700 text-xs font-bold'>{item.data[0].market_cap_rank}</span>
                                    <img className='w-10 h-10 bg-white rounded-full' src={item.data[0].image} alt={`${item.data[0].name}-logo`} />
                                    <div>
                                        <p className='flex items-center justify-between gap-3 text-xs font-bold uppercase' >
                                            {item.data[0].name}
                                            <small className='text-gray-700 text-xs'>
                                                {item.data[0].symbol}
                                            </small>
                                            {
                                                item.data[0].price_change_percentage_24h > 0
                                                    ? <GraphUp />
                                                    : <GraphDown />
                                            }
                                        </p>
                                        <small className='text-gray-700 text-xs'>
                                            {item.data[0].current_price}
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