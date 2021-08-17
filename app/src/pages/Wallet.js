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
            <Navigation />
            <header className='fixed right-6 bottom-6'>
                <button className="gradient-bg py-4 pl-6 pr-8 rounded-2xl font-bold flex gap-3" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5 11H5.5C4.67157 11 4 11.6716 4 12.5V13H8.58579C8.851 13 9.10536 13.1054 9.29289 13.2929L10.2929 14.2929C10.7456 14.7456 11.3597 15 12 15C12.6403 15 13.2544 14.7456 13.7071 14.2929L14.7071 13.2929C14.8946 13.1054 15.149 13 15.4142 13H20V12.5C20 11.6716 19.3284 11 18.5 11Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 6C4.67157 6 4 6.67157 4 7.5V8H20V7.5C20 6.67157 19.3284 6 18.5 6H5.5Z" fill="white" />
                    </svg>
                    100€
                </button>
            </header>
            <motion.section
                initial='hidden'
                animate='visible'
                variants={container}
                className='md:py-10 py-9 md:px-12 px-0 w-full'>
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
                                    <img className='w-10 h-10 bg-white rounded-full' src={item.data[0].image} alt={`${item.data[0].name}-logo`} />
                                    <span>
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
                                            {item.data[0].current_price}&nbsp;€
                                        </small>
                                    </span>
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