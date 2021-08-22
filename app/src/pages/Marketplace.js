import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { CoinsContext } from '../hooks/use-currencies';
import { useAuth } from '../hooks/use-auth';

import { Layout } from '../components/Layout';
import { ButtonGhost } from '../components/Buttons';
import { GraphUp, GraphDown } from '../components/Icons';
import { Table } from '../components/Table';
import { Loader } from '../components/Loader';

import { container, article } from '../animations/motion';

import { getSessionTokenCookie } from "../constants/session-storage-endpoints";


export default function Marketplace() {
    const [topCoinsVisible, setTopCoinsVisible] = useState(true);
    const { coins, market } = useContext(CoinsContext);
    const auth = useAuth();

    useEffect(() => {
        auth.getAuthUser();
    }, [auth])

    if ((getSessionTokenCookie && !auth.user) || coins.length === 0 || !market.status.data) {
        return <Loader />;
    }

    return (
        <>
            <Layout>
                <div className='flex items-start gap-6 mt-6' >
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
                                <b className={`${market.status.data.market_cap_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} text-sm`} >
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
                        {coins &&
                            coins.map((item) => (
                                <motion.article
                                    key={item.data[0].id}
                                    variants={article}
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

                <section className='mt-12' >
                    <Table headings={[
                        "Name",
                        "Price",
                        "Price Change 24h",
                        "Market Cap",
                        "Circulating Supply",
                        "24h %"
                    ]} >
                        {coins &&
                            coins.map((item, key) => (
                                <motion.tr
                                    key={key}
                                    initial='hidden'
                                    animate='visible'
                                    variants={container}
                                    className='flex items-center gap-3 justify-between text-white py-6 px-4 gap-3 border-b-2 border-gray-800 transition hover:bg-gray-800'>
                                    <motion.td variants={article} className='text-left w-2/12 flex items-start gap-3' >
                                        <img className='w-8 h-8 bg-white rounded-full' src={item.data[0].image} alt={`${item.data[0].name}-logo`} />
                                        <p className='flex flex-col text-sm font-bold uppercase' >
                                            {item.data[0].name}
                                            <span className='text-gray-700 text-xs'>{item.data[0].symbol}</span>
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='text-left w-2/12' >
                                        <p className='flex items-center text-sm font-bold uppercase mb-1' >
                                            {item.data[0].current_price}
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='text-left w-2/12' >
                                        <p className={`${item.data[0].price_change_percentage_24h >= 0 ? 'text-green-900' : 'text-red-900'} text-sm flex gap-1`} >
                                            {item.data[0].price_change_percentage_24h >= 0
                                                ? <>
                                                    <small>&#x25B2;</small>
                                                    {item.data[0].price_change_percentage_24h.toFixed(2)}%
                                                </>
                                                : <>
                                                    <small>&#x25BC;</small>
                                                    {item.data[0].price_change_percentage_24h.toFixed(2) * -1}%
                                                </>

                                            }
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='text-left w-2/12' >
                                        <p className='flex items-center text-sm font-bold uppercase mb-1' >
                                            {item.data[0].market_cap}€
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='text-left w-2/12' >
                                        <p className='flex items-center text-sm font-bold uppercase mb-1' >
                                            {item.data[0].circulating_supply}&nbsp;<span className='text-gray-700 text-xs'>&nbsp;{item.data[0].symbol}</span>
                                        </p>
                                    </motion.td>
                                    <motion.td variants={article} className='text-left w-2/12  bg-gray-800' >
                                        <p className='mb-1 text-sm' >
                                            {item.data[0].price_change_percentage_24h > 0
                                                ? <GraphUp />
                                                : <GraphDown />
                                            }
                                        </p>
                                    </motion.td>
                                </motion.tr>
                            ))
                        }
                    </Table>
                </section>
            </Layout>
        </>
    );
}