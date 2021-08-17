import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';

import { CoinsContext } from '../hooks/use-currencies';

import { Navigation } from '../components/Navigation';
import { ButtonGhost } from '../components/Button';
import { GraphUp, GraphDown } from '../components/Icons';

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

export default function Explore() {
    const [topCoinsVisible, setTopCoinsVisible] = useState(true);
    const { coins } = useContext(CoinsContext);

    return (
        <>
            <Navigation />
            <main className='text-white md:h-screen max-w-screen-2xl flex flex-col mx-auto' >
                <motion.section
                    initial='hidden'
                    animate='visible'
                    variants={container}
                    className='flex justify-center flex-col md:py-10 py-9 w-full px-6'>
                    <div className='flex items-start gap-6 mt-20' >
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
                    { topCoinsVisible
                        && <motion.section
                            initial='hidden'
                            animate='visible'
                            variants={container}
                            className='mt-12 flex flex-wrap gap-8' >
                            {coins &&
                                coins.map((item) => (
                                    <motion.article
                                        key={item.data[0].id}
                                        variants={article}
                                        exit={article.hidden}
                                        className="flex items-center gap-3 md:w-48 w-full">
                                        <img className='w-10 h-10 bg-white rounded-full' src={item.data[0].image} alt={`${item.data[0].name}-logo`} />
                                        <span>
                                            <p className='flex items-center text-xs font-bold uppercase mb-1' >
                                                {item.data[0].name}<span className='text-gray-700 text-xs'>&nbsp;/&nbsp;{item.data[0].symbol}</span>
                                            </p>
                                            <small className='text-gray-700 text-xs flex gap-2'>
                                                {item.data[0].current_price}&nbsp;€
                                                {item.data[0].price_change_percentage_24h > 0
                                                    ? <GraphUp />
                                                    : <GraphDown />
                                                }
                                            </small>
                                        </span>
                                    </motion.article>
                                ))
                            }
                        </motion.section>
                    }
                </motion.section>
            </main>
        </>
    );
}