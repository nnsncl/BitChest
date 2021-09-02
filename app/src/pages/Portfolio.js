import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';

import { useAuth } from '../hooks/use-auth';
import { CoinsContext } from '../hooks/use-currencies';
import { TransactionsContext } from '../hooks/use-transactions';

import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { GraphUp } from '../components/Icons';
import { TransactionsModule } from '../components/TransactionsModule';

import { container, article } from '../animations/motion';

export default function Portfolio() {
    const auth = useAuth();
    const { transactions}  = useContext(TransactionsContext);
    const { refs, storedCoins } = useContext(CoinsContext);

    const BASE_PORTFOLIO = 
        refs.map(item => {
            return {
                name: item.coin_id,
                value: [],
            }
        })

    const [totalCoinsTableVisible, setTotalCoinsTableVisible] = useState(true);
    const [userCoins, setUserCoins] = useState([]);
    const [portfolio, setPortfolio] = useState(BASE_PORTFOLIO);
    const [filteredTransactions, setFilteredTransactions] =useState([]);

    useEffect(() => {
        let concatenated_array = [];
        transactions.map((transaction, key) => {
            const filterTransactions = refs.filter(ref => ref.id === transaction.currency_id);

            concatenated_array.push(filterTransactions[0]);
            setFilteredTransactions(concatenated_array);
        })
    }, []);

    useEffect(() => {

    }, [filteredTransactions]);

    console.log(filteredTransactions);
    console.log("portfolio", portfolio)


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
                        {(userCoins && totalCoinsTableVisible) &&
                            userCoins.map((item, key) => (
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
                                    <motion.td>
                                        <p>{item.total_balance}</p>
                                    </motion.td>
                                    <motion.td>
                                        <p>{item.total_coin}</p>
                                    </motion.td>
                                </motion.tr>
                            ))
                        }
                    </Table>
                    <div className='flex items-center justify-between gap-6 mb-3' >
                        <h3 className='text-base font-light'>Recent Activity</h3>
                        <button
                            onClick={() => setTotalCoinsTableVisible(!totalCoinsTableVisible)}
                            className='flex items-center gap-3 font-light text-xs py-2 px-4 border-2 border-gray-800 hover:bg-gray-800 rounded-full outline-none' >
                            See all
                        </button>
                    </div>
                    <Table>
                        {transactions.map((item, key) => (
                                <motion.tr 
                                    className='rounded-b-2xl flex items-center justify-between gap-6 text-white py-6 px-4 gap-6 border-t-2 border-gray-800'
                                    key={key}
                                >
                                    <motion.td className='w-1/7 flex flex-col items-center justify-start uppercase'>
                                        <p className="text-gray-700">
                                            {moment(item.created_at).format("MMM")}
                                        </p>
                                        <p>
                                            {moment(item.created_at).format("DD")}
                                        </p>
                                    </motion.td>
                                    <motion.td className='w-1/7 flex items-center justify-start gap-3'>
                                        {item.type === 1 ? "Purchase" : "Sell"}
                                    </motion.td>
                                    <motion.td className='w-2/7 flex items-center justify-start gap-3'>
                                        {refs.filter(ref => ref.id === item.currency_id)[0].name}
                                    </motion.td>
                                    <motion.td className='w-3/7'>
                                        <p className={`${item.type === 1 ? "text-green-900" : "text-red-900"} uppercase flex gap-3`}>
                                            <span>{item.type === 1 ? "+" : "-"}
                                                {item.currency_quantity}
                                            </span>
                                            <span>{refs.filter(ref => ref.id === item.currency_id)[0].symbol}</span>
                                        </p>
                                        <p className="flex justify-end text-gray-700">
                                            {item.type === 1 ? "-" : "+"}
                                            {item.transaction_amount}€
                                        </p>
                                    </motion.td>
                                </motion.tr>
                            )
                        )}
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