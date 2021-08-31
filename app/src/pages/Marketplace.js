import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { CoinsContext } from '../hooks/use-currencies';
import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { Market } from '../components/Market';
import { TransactionsModule } from '../components/TransactionsModule';

import { ButtonGhost } from '../components/Buttons';
import { Swap } from '../components/Icons';
import { Table } from '../components/Table';

import { container, article } from '../animations/motion';


export default function Marketplace() {
    const [topCoinsVisible, setTopCoinsVisible] = useState(true);
    const [transactionsModuleVisible, setTransactionsModuleVisible] = useState(false);
    const { storedCoins, market } = useContext(CoinsContext);
    const auth = useAuth();

    return (
        <>
            <Layout>
                <header className='flex items-start gap-6' >
                    <section>
                        <h1 className='text-3xl font-bold mb-2'>
                            <span className='gradient-text' >Today's</span> Cryptocurrency<br />market prices
                        </h1>
                        <p className='text-gray-700' >
                            The total market cap has&nbsp;
                            <span className='text-white' >
                                {market.status.data &&
                                    market.status.data.market_cap_change_percentage_24h_usd >= 0 ? 'increased' : 'decreased'
                                }
                            </span>&nbsp;by&nbsp;
                            {market.status.data &&
                                <b className={`${market.status.data.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-900' : 'text-red-900'} text-sm`} >
                                    {market.status.data.market_cap_change_percentage_24h_usd.toFixed(2)}%
                                </b>
                            }
                            &nbsp;over the&nbsp;<span className='text-white'>last day</span>.
                        </p>
                    </section>
                    <ButtonGhost onClick={() => setTopCoinsVisible(!topCoinsVisible)}>
                        <b>:</b>
                    </ButtonGhost>
                </header>
                { topCoinsVisible
                    && <Market />
                }
                <section className='mt-12' >
                    <Table headings={
                        <>
                            <th className="w-1/3 text-left text-xs" >Name</th>
                            <th className="w-1/3 text-left text-xs md:block hidden" >Price</th>
                            <th className="w-1/3 text-left text-xs" >Price Change 24h</th>
                            <th className="w-1/3 text-left text-xs md:block hidden" >Market Cap</th>
                            <th className="w-1/3 text-left text-xs md:block hidden" >Circulating Supply</th>
                            <th className="w-1/3 text-left text-xs" ></th>
                        </>
                    }>
                        {storedCoins &&
                            storedCoins.map((item, key) => (
                                <motion.tr
                                    key={key}
                                    initial='hidden'
                                    animate='visible'
                                    variants={container}
                                    className='flex items-center justify-between gap-6 text-white py-6 px-4 gap-6 border-b-2 border-gray-800 transition hover:bg-gray-800'>
                                    <motion.td variants={article} className='w-1/3 flex items-start gap-3' >
                                        <img className='w-8 h-8 bg-white rounded-full' src={item.image} alt={`${item.name}-logo`} />
                                        <p className='flex flex-col md:text-sm text-xs' >
                                            {item.name}
                                            <span className='text-gray-700 text-xs uppercase'>{item.symbol}</span>
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/3 md:flex hidden items-start' >
                                        <p className={`${item.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} flex items-center text-sm uppercase`} >
                                            {item.price_change_percentage_24h >= 0
                                                ? <small>&#x25B2;</small>
                                                : <small>&#x25BC;</small>
                                            }
                                            &nbsp;{item.current_price.toLocaleString()}€
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/3 flex items-start' >
                                        <p className={`${item.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} text-sm flex gap-1`} >
                                            {item.price_change_percentage_24h >= 0
                                                ? <>
                                                    <small>&#x25B2;</small>
                                                    {item.price_change_percentage_24h.toFixed(2)}%
                                                </>
                                                : <>
                                                    <small>&#x25BC;</small>
                                                    {item.price_change_percentage_24h.toFixed(2) * -1}%
                                                </>
                                            }
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/3 md:flex hidden items-start' >
                                        <p className={`${item.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} flex items-center text-sm uppercase`} >
                                            {item.market_cap_change_percentage_24h >= 0
                                                ? <small>&#x25B2;</small>
                                                : <small>&#x25BC;</small>
                                            }
                                            &nbsp;{item.market_cap.toLocaleString()}€
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/3 md:flex hidden items-start' >
                                        <p className='flex items-center text-sm' >
                                            {item.circulating_supply.toLocaleString()}&nbsp;<span className='uppercase text-gray-700 text-xs'>&nbsp;{item.symbol}</span>
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/3 flex items-start' >
                                        <Link
                                            to={`/currency/${item.coin_id}`}
                                            className='text-xs bg-blue-900 px-6 py-3 rounded-lg w-full text-center'>
                                            Buy
                                        </Link>
                                    </motion.td>
                                </motion.tr>
                            ))
                        }
                    </Table>
                </section>
                {auth.storedUser &&
                    <button
                        onClick={() => setTransactionsModuleVisible(!transactionsModuleVisible)}
                        className='flex items-center gap-2 gradient-bg text-sm py-3 px-6 rounded-lg fixed bottom-6 right-6' >
                        <Swap />
                        {auth.storedUser.balance}€
                    </button>
                }
                {(transactionsModuleVisible && storedCoins) &&
                    <TransactionsModule />
                }
            </Layout>
        </>
    );
}