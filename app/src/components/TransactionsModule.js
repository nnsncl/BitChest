import React, { useState, useContext } from 'react';
import { CoinsContext } from '../hooks/use-currencies';

import { Swap, Diamond } from './Icons';

export const TransactionsModule = ({position}) => {
    const { storedCoins } = useContext(CoinsContext);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const [transactionMode, setTransactionMode] = useState(true);
    const [balanceAmount, setBalanceAmount] = useState(0);

    return (
        <article className={`${position ? position : 'bottom-20'} right-6 bg-black text-gray-700 fixed rounded-2xl shadow-xl md:w-96 w-80 z-90`}>
            <ul className='flex w-full' >
                <li className={`w-1/2 py-6 flex items-center justify-center ${transactionMode && "border-b-2 text-blue-900"}`}>
                    <button className='hover:text-blue-900 text-sm' onClick={() => setTransactionMode(true)}>Buy</button>
                </li>
                <li className={`w-1/2 py-6 flex items-center justify-center ${!transactionMode && "border-b-2 text-blue-900"}`}>
                    <button className='hover:text-blue-900 text-sm' onClick={() => setTransactionMode(false)}>Sell</button>
                </li>
            </ul>
            {transactionMode
                ? <form className='px-6 py-9 flex flex-col gap-6' >
                    <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                        <label htmlFor='coin' className='text-xs mb-1' >Coin Name</label>
                        <div className='flex w-full justify-between items-center ' >
                            <select
                                onChange={(e) => setSelectedCoin(e.target.value)}
                                name='coin'
                                id="coin-select"
                                className='bg-transparent w-full appearance-none outline-none text-white'
                            >
                                <option value="" >Select a currency</option>
                                {storedCoins && storedCoins.map((item, key) => (
                                    <option
                                        key={key}
                                        value={key}
                                        className='text-xs font-regular' >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {storedCoins[selectedCoin] &&
                                storedCoins[selectedCoin].image
                                ? <img
                                    className='w-8 h-8 bg-white rounded-full'
                                    src={storedCoins[selectedCoin].image}
                                    alt={`${storedCoins[selectedCoin].image.name}-logo`}
                                />
                                : <small className='text-white text-xs' >▼</small>
                            }
                        </div>
                    </fieldset>
                    <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                        <label htmlFor='transaction_amount' className='text-xs mb-1' >Amount (EUR)</label>
                        <div className='flex w-full justify-between items-center ' >
                            <input
                                type='number'
                                onChange={(e) => setBalanceAmount(e.target.value)}
                                name='transaction_amount'
                                placeholder='10'
                                defaultValue=''
                                min={0}
                                className='w-full bg-transparent text-xs font-bold text-white appearance-none outline-none'
                            />
                            <small className='text-white text-xs' ><Swap /></small>
                        </div>
                    </fieldset>
                    <fieldset className='flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none' >
                        <label htmlFor='transaction_amount' className='text-xs mb-1' >
                            Amount&nbsp;<span className='uppercase' >({storedCoins[selectedCoin] && storedCoins[selectedCoin].symbol})</span>
                        </label>
                        <div className='flex w-full justify-between items-center ' >
                            <p className='bg-transparent text-xs font-bold text-white appearance-none outline-none'>
                                {storedCoins[selectedCoin]
                                    ? ((balanceAmount && selectedCoin && balanceAmount)
                                        / (storedCoins[selectedCoin]
                                            && storedCoins[selectedCoin].current_price)
                                    ).toFixed(2)
                                    : 0
                                }
                            </p>
                            <small className='text-white text-xs' ><Diamond /></small>
                        </div>
                    </fieldset>
                    <button className='bg-blue-900 py-2 rounded-lg text-white'>Buy</button>
                </form>
                : 'sell'
            }
        </article>
    );
};
