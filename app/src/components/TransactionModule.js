import React, { useState, useContext } from 'react';

import { CoinsContext } from '../hooks/use-currencies';
import { Swap, Diamond } from './Icons';

export const TransactionsModule = () => {
    const { storedCoins } = useContext(CoinsContext);
    const [selectedCoin, setSelectedCoin] = useState(0);

    const [transactionMode, settransactionMode] = useState(true);
    const [balanceAmount, setbalanceAmount] = useState(0);

    const PurchaseForm = () => {
        return (
            <form className='px-6 py-9 flex flex-col gap-6' onSubmit={e => e.preventDefault()} >
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
                            onChange={(e) => setbalanceAmount(e.target.value)}
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
                            {((balanceAmount && selectedCoin && balanceAmount) / storedCoins[selectedCoin].current_price).toFixed(2)}
                        </p>
                        <small className='text-white text-xs' ><Diamond /></small>
                    </div>
                </fieldset>
                <button className='bg-blue-900 py-2 rounded-lg text-white'>Buy</button>
            </form>
        );
    };

    return (
        <article className='bg-black text-gray-700 fixed bottom-20 right-6 rounded-2xl shadow-xl w-auto z-90'>
            <ul className='flex w-full' >
                <li className={`w-1/2 py-6 flex items-center justify-center ${transactionMode && "border-b-2 text-blue-900"}`}>
                    <button className='hover:text-blue-900 text-sm' onClick={() => settransactionMode(true)}>Buy</button>
                </li>
                <li className={`w-1/2 py-6 flex items-center justify-center ${!transactionMode && "border-b-2 text-blue-900"}`}>
                    <button className='hover:text-blue-900 text-sm' onClick={() => settransactionMode(false)}>Sell</button>
                </li>
            </ul>
            {transactionMode
                ? <PurchaseForm />
                : <PurchaseForm />
            }
        </article>
    );
};
