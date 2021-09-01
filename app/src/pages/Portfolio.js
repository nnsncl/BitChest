import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from '../hooks/use-auth';
import { CoinsContext } from '../hooks/use-currencies';

import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { TransactionsModule } from '../components/TransactionsModule';

import { container, article } from '../animations/motion';
import { GraphUp } from '../components/Icons';


export default function Portfolio() {
    const auth = useAuth();
    const { storedCoins } = useContext(CoinsContext);
    // if (!auth.storedUser) {
    //     return <Loader />;
    // }

    return (
        <Layout>
            <header className='mb-12' >
                <h1 className='text-lg font-bold'>Hi {auth.storedUser.name},</h1>
                <p className='text-sm text-gray-700' >Manage your every coin with ease.</p>
            </header>
            <section className="flex md:flex-row flex-col items-start gap-6 mb-6">
                <div className="md:w-3/4 w-full">
                    <div className='flex items-center justify-between gap-6 mb-3' >
                        <h3 className='text-base font-light'>Your assets</h3>
                        <span className='flex items-center gap-3 font-light text-xs py-2 px-4 border-2 border-gray-800 rounded-full' >
                            <GraphUp />Tradable assets
                        </span>
                    </div>

                    <Table boxed headings={
                        <>
                            <th className="w-2/4 text-left text-xs" >Coin Name</th>
                            <th className="w-1/4 text-right text-xs" >Total Balance</th>
                            <th className="w-1/4 text-right text-xs" >Total Coin</th>
                        </>
                    }>
                        {storedCoins &&
                            storedCoins.map((item, key) => (
                                <motion.tr
                                    key={key}
                                    initial='hidden'
                                    animate='visible'
                                    variants={container}
                                    className='rounded-b-xl flex items-center justify-between gap-6 text-white py-6 px-4 gap-6 border-t-2 border-gray-800'>
                                    <motion.td variants={article} className='w-2/4 flex items-center justify-start gap-3' >
                                        <img className='w-6 h-6 bg-white rounded-full' src={item.image} alt={`${item.name}-logo`} />
                                        <p className='flex flex-col md:text-sm text-xs' >
                                            {item.name}
                                            <span className='text-gray-700 text-xs uppercase'>{item.symbol}</span>
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/4 flex items-cente justify-end gap-3' >
                                        <p className={`${item.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} text-right flex items-center text-sm uppercase`} >
                                            {item.price_change_percentage_24h >= 0
                                                ? <small>&#x25B2;</small>
                                                : <small>&#x25BC;</small>
                                            }
                                            &nbsp;{item.current_price.toLocaleString()}€
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='w-1/4 flex items-cente justify-end gap-3' >
                                        <p className={`${item.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} text-sm flex gap-1 text-right`} >
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
                                </motion.tr>
                            ))
                        }
                    </Table>
                </div>
                <div className="md:w-1/4 w-full">
                    <TransactionsModule width='w-100' />
                </div>
            </section>
        </Layout>
    );
}