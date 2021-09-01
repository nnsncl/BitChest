import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '../hooks/use-auth';
import { useTransactions } from '../hooks/use-transactions';
import { CoinsContext } from '../hooks/use-currencies';

import { Loader } from '../components/Loader';
import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { GraphUp } from '../components/Icons';
import { TransactionsModule } from '../components/TransactionsModule';

import { container, article } from '../animations/motion';


export default function Portfolio() {
    const auth = useAuth();
    const userTransactions = useTransactions();
    const { refs, storedCoins } = useContext(CoinsContext);

    const [totalCoinsTableVisible, setTotalCoinsTableVisible] = useState(true);

    useEffect(() => {
        userTransactions.actions.getTransactions(auth.storedUser.id, auth.storedToken);
        //eslint-disable-next-line
    }, [userTransactions.actions.transactions])

    if (!userTransactions.actions.transactions) {
        return <Loader />;
    }

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
                        <button
                            onClick={() => setTotalCoinsTableVisible(!totalCoinsTableVisible)}
                            className='flex items-center gap-3 font-light text-xs py-2 px-4 border-2 border-gray-800 hover:bg-gray-800 rounded-full outline-none' >
                            <GraphUp />
                            Tradable assets
                            {totalCoinsTableVisible
                                ? <small>&#x25BC;</small>
                                : <small>&#x25B2;</small>
                            }
                        </button>
                    </div>

                    <Table boxed headings={
                        <>
                            <th className="w-2/4 text-left text-xs" >Coin Name</th>
                            <th className="w-1/4 text-right text-xs" >Total Balance</th>
                            <th className="w-1/4 text-right text-xs" >Total Coin</th>
                        </>
                    }>
                        {(storedCoins && totalCoinsTableVisible) &&
                            storedCoins.map((item, key) => (
                                <motion.tr
                                    key={key}
                                    initial='hidden'
                                    animate='visible'
                                    variants={container}
                                    className='rounded-b-2xl flex items-center justify-between gap-6 text-white py-6 px-4 gap-6 border-t-2 border-gray-800'>
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
                    <div className='flex items-center justify-between gap-6 mb-3' >
                        <p className='text-sm font-bold'><span className='gradient-text' >Current&nbsp;</span>balance:</p>
                        <span
                            className='text-xs font-bold py-2 px-4 border-2 border-gray-800 rounded-full outline-none' >
                            {auth.storedUser.balance}€&nbsp;<span className='uppercase font-light text-gray-700' >(EUR)</span>
                        </span>
                    </div>
                    <TransactionsModule width='w-100' />
                </div>
            </section>
        </Layout>
    );
}