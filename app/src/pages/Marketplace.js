import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { CoinsContext } from '../hooks/use-currencies';
import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { ButtonGhost } from '../components/Buttons';
import { GraphUp, GraphDown, Swap, Diamond } from '../components/Icons';
import { Table } from '../components/Table';

import { container, article } from '../animations/motion';


export default function Marketplace() {
    const [topCoinsVisible, setTopCoinsVisible] = useState(true);
    const { storedCoins, market } = useContext(CoinsContext);
    const auth = useAuth();

    const [displayWallet, setDisplayWallet] = useState(false);
    const [walletMode, setWalletMode] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState(0);
    const [moneyAmount, setMoneyAmount] = useState(0);

    return (
        <>
            <Layout>
                <div className='flex items-start gap-6' >
                    <div>
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
                    </div>
                    <ButtonGhost onClick={() => setTopCoinsVisible(!topCoinsVisible)}>
                        <b>:</b>
                    </ButtonGhost>
                </div>
                {topCoinsVisible
                    && <motion.section
                        initial='hidden'
                        animate='visible'
                        variants={container}
                        className='mt-12 flex flex-wrap gap-8' >
                        {storedCoins &&
                            storedCoins.map((item, key) => (
                                <motion.article
                                    key={key}
                                    variants={article}
                                    className="flex items-center gap-3 md:w-48 w-full">
                                    <img className='w-10 h-10 bg-white rounded-full' src={item.image} alt={`${item.name}-logo`} />
                                    <span>
                                        <p className='flex items-center text-xs font-bold uppercase mb-1' >
                                            {item.name}<span className='text-gray-700 text-xs'>&nbsp;/&nbsp;{item.symbol}</span>
                                        </p>
                                        <small className='text-gray-700 text-xs flex gap-2'>
                                            {(item.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 }))}€
                                            {item.price_change_percentage_24h > 0
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
                    <button onClick={() => setDisplayWallet(!displayWallet)} className='flex items-center gap-2 gradient-bg text-sm py-3 px-6 rounded-lg fixed bottom-6 right-6' >
                        <Swap />
                        {auth.storedUser.balance}€
                    </button>
                }

                {displayWallet &&
                    <article className='bg-black text-gray-700 fixed bottom-20 right-6 rounded-2xl shadow-xl md:w-1/3 w-auto z-90'>
                        <ul className='flex w-full' >
                            <li className={`w-1/2 py-6 flex items-center justify-center ${walletMode && "border-b-2 text-blue-900"}`}>
                                <button className='hover:text-blue-900 text-sm' onClick={() => setWalletMode(true)}>Buy</button>
                            </li>
                            <li className={`w-1/2 py-6 flex items-center justify-center ${!walletMode && "border-b-2 text-blue-900"}`}>
                                <button className='hover:text-blue-900 text-sm' onClick={() => setWalletMode(false)}>Sell</button>
                            </li>
                        </ul>
                        {walletMode ?
                            <form className='px-6 py-9 flex flex-col gap-6'>

                                <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                                    <label htmlFor='coin' className='text-xs mb-1' >Coin Name</label>
                                    <div className='flex w-full justify-between items-center ' >
                                        <select
                                            onChange={(e) => setSelectedCoin(e.target.value)}
                                            name='coin'
                                            id="coin-select"
                                            className='bg-transparent text-base font-bold text-white appearance-none'
                                        >
                                            <option value="" disabled >--Please choose a currency--</option>
                                            {storedCoins && storedCoins.map((item, key) => (
                                                <option
                                                    key={key}
                                                    value={key}
                                                    className='capitalize font-bold text-white py-3' >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <small className='text-white text-xs' >▼</small>
                                    </div>
                                </fieldset>
                                
                                <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                                    <label htmlFor='transaction_amount' className='text-xs mb-1' >Amount (EUR)</label>
                                    <div className='flex w-full justify-between items-center ' >
                                    <input
                                        onChange={(e) => setMoneyAmount(e.target.value)}
                                        name='transaction_amount'
                                        placeholder='10'
                                        className='bg-transparent text-xs font-bold text-white appearance-none outline-none'
                                    />
                                     <small className='text-white text-xs' ><Swap /></small>
                                    </div>
                                </fieldset>

                                <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                                    <label htmlFor='transaction_amount' className='text-xs mb-1' >
                                        Amount&nbsp;<span className='uppercase' >({storedCoins[selectedCoin].symbol})</span>
                                    </label>
                                    <div className='flex w-full justify-between items-center ' >
                                    <p className='bg-transparent text-xs font-bold text-white appearance-none outline-none'>
                                        {((moneyAmount && selectedCoin && moneyAmount) / storedCoins[selectedCoin].current_price ).toFixed(2)}
                                    </p>
                                     <small className='text-white text-xs' ><Diamond /></small>
                                    </div>
                                </fieldset>

                                <button className='bg-blue-900 py-2 rounded-lg text-white'>Buy</button>
                            </form>
                            :
                            <form className='px-6 py-9 flex flex-col gap-5'>
                                Sell
                            </form>
                        }
                    </article>}
            </Layout>
        </>
    );
}