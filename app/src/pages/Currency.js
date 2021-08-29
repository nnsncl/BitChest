import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { useAuth } from '../hooks/use-auth';
import { CoinsContext } from '../hooks/use-currencies';

import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

import { SESSION_TOKEN } from "../constants/session";

export default function Currency() {
    const auth = useAuth();
    const { coins } = useContext(CoinsContext);
    const { id } = useParams();
    const [currency, setCurrency] = useState({});

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    useEffect(() => {
        coins &&
            axios
                .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${id}&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
                .then((response) => {
                    setCurrency(response.data[0])
                })
                .catch(function (error) {
                    console.error(error.message);
                })
    }, [id, coins])


    if (SESSION_TOKEN && !auth.user) {
        return <Loader />;
    }

    return (
        <Layout>
            <header className='flex md:flex-row flex-col items-start gap-6 mb-6 pb-6 border-gray-800 border-b-2' >
                <section className='md:w-1/3 w-full' >
                    <div className='flex items-center gap-3 mb-3'>
                        <img className='w-9 h-9 bg-white rounded-full' src={currency.image && currency.image} alt={`${currency.name}-logo`} />
                        <h1 className='text-3xl font-bold'>{currency.name}</h1>
                        <span className='block text-xs font-bold border-2 border-gray-800 rounded-lg px-2 py-1 uppercase text-gray-700 '>{currency.symbol}</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-700 md:mb-6'>
                        <span className='block text-white text-xs font-bold border-2 border-gray-800 rounded-lg px-2 py-1'>Rank #{currency.market_cap_rank}</span>
                        <span className='block text-xs font-bold border-2 border-gray-800 rounded-lg px-2 py-1'>Coin</span>
                    </div>
                    <div className='text-gray-700 text-xs md:block hidden'>
                        <p className='mb-3'>Tags</p>
                        <div className='flex items-center gap-3' >
                            <span className='block font-bold border-2 border-gray-800 rounded-full px-2 py-1'>mineable</span>
                            <span className='block font-bold border-2 border-gray-800 rounded-full px-2 py-1'>PoW</span>
                            <span className='block font-bold border-2 border-gray-800 rounded-full px-2 py-1'>SHA-264</span>
                        </div>
                    </div>
                </section>
                <section className='md:w-2/3 w-full' >
                    <div className=' mb-6 pb-6 border-b-2 border-gray-800' >
                        <div className='flex items-start gap-3 mb-3'  >
                            <h2 className='text-6xl font-bold'>
                                {currency.current_price && currency.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}€
                            </h2>
                            <span className={`${currency.price_change_percentage_24h >= 0 ? 'bg-green-900' : 'bg-red-900'} mt-2 flex items-center text-sm px-3 py-1 rounded-lg text-xs uppercase`}>
                                {currency.price_change_percentage_24h >= 0
                                    ? <small>&#x25B2;</small>
                                    : <small>&#x25BC;</small>
                                }&nbsp;
                                {currency.current_price && currency.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}€
                            </span>
                        </div>
                        <ul className='flex items-baseline gap-3 text-xs' >
                            <li className='flex items-center text-xs text-gray-700 mb-2 mr-3' >
                                {currency.name}&nbsp;Price&nbsp;<span className='uppercase' >({currency.symbol})</span>
                            </li>
                            <li className='text-gray-700 '>
                                High:&nbsp;<span className='text-white' >{currency.high_24h}€</span>
                            </li>
                            <li className='text-gray-700 '>
                                Low:&nbsp;<span className='text-white' >{currency.low_24h}€</span>
                            </li>
                            <span className='block text-gray-700 text-xs font-bold border-gray-800 border-2 rounded-lg px-2 py-1'>24h</span>
                        </ul>
                    </div>
                    <ul className='text-xs md:flex-row flex-col flex items-start justify-between gap-6' >
                        <li className='flex flex-col gap-2' >
                            <p className='text-gray-700 '>Market cap</p>
                            <p>{currency.market_cap && currency.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}€</p>
                        </li>
                        {currency.fully_diluted_valuation &&
                            <li className='flex flex-col gap-2' >
                                <p className='text-gray-700 '>Fully Diluted Valuation</p>
                                <p>{currency.fully_diluted_valuation.toLocaleString(undefined, { maximumFractionDigits: 2 })}€</p>
                            </li>
                        }
                        <li className='flex flex-col gap-2' >
                            <p className='text-gray-700 '>Total Volume</p>
                            <p>{currency.total_volume && currency.total_volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}€</p>
                        </li>
                        <li className='flex flex-col gap-2' >
                            <p className='text-gray-700 '>Circulating Supply</p>
                            <p>{currency.circulating_supply && currency.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                        </li>
                    </ul>
                </section>
            </header>

            <section className='flex md:flex-row flex-col items-start w-full justify-between' >
                <div className='md:w-2/3 w-full' >Graph</div>
                <article className='md:w-1/3 w-full bg-gray-800 p-6 rounded-xl' >
                    <h3 className='text-xl font-bold mb-9' >
                        <span className='uppercase'>{currency.symbol}</span>&nbsp;Price Statistics
                    </h3>
                    <ul className='text-gray-700' >
                        <p className='font-light text-xs mb-3'>{currency.name}&nbsp;Price Today</p>
                        <li className='flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-3 ' >
                            <p className='font-bold'>{currency.name}&nbsp;Price</p>
                            <p className='text-white'>{currency.current_price}€</p>
                        </li>
                        <li className='flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-3' >
                            <p className='font-bold flex items-center gap-2'>
                                Price Change <span className='block text-gray-700 text-xs font-bold border-gray-700 border-2 rounded-lg px-1'>24h</span>
                            </p>
                            <p className='flex flex-col items-end'>
                                <span className='text-white'>
                                    {currency.price_change_24h && currency.price_change_24h.toLocaleString(undefined, { maximumFractionDigits: 3 })}€
                                </span>
                                <span className={`${currency.price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                                    {currency.price_change_percentage_24h && currency.price_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 3 })}%
                                </span>
                            </p>
                        </li>
                        <li className='flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-9' >
                            <p className='font-bold'>24h High / Low</p>
                            <p className='flex flex-col items-end'>
                                <span className='text-white'>
                                    {currency.high_24h}€
                                </span>
                                <span className='text-white'>
                                    {currency.low_24h}€
                                </span>
                            </p>
                        </li>
                        <p className='font-light text-xs mb-3'>{currency.name}&nbsp;Market Cap</p>
                        <li className='flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-3' >
                            <p className='font-bold flex items-center gap-2'>Market Cap</p>
                            <p className='flex flex-col items-end'>
                                <span className='text-white'>
                                    {currency.market_cap_change_24h && currency.market_cap_change_24h.toLocaleString(undefined, { maximumFractionDigits: 3 })}€
                                </span>
                                <span className={`${currency.market_cap_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                                    {currency.market_cap_change_percentage_24h && currency.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 3 })}%
                                </span>
                            </p>
                        </li>
                        <li className='flex items-center justify-between' >
                            <span className='font-bold'>Market Rank</span>
                            <span className='text-white'>#{currency.market_cap_rank}</span>
                        </li>
                    </ul>
                </article>
            </section>
        </Layout>
    );
}