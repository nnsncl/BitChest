import React, { useContext } from 'react';

import { CoinsContext } from '../hooks/use-currencies';

export const Banner = () => {
    const { market } = useContext(CoinsContext);

    return (
        <section className='w-full py-3 flex items-center justify-between w-100 text-gray-700 overflow-hidden relative overflow-x-auto overflow-y-hidden scrollbar--hidden gap-6' >
            {market.status.data && market.exchangesList
                ? <>
                    <div className="sm:hidden absolute h-full w-12 bg-gradient--dark right-0 top-0" />
                    <ul className='flex items-center gap-6' >
                        <li className='min-w-max' >
                            <p className='text-xs' >
                                Active cryptocurrencies:&nbsp;<span className='text-blue-900' >{market.status.data.active_cryptocurrencies}</span>
                            </p>
                        </li>
                        <li className='min-w-max' >
                            <p className='text-xs' >
                                Exchanges:&nbsp;<span className='text-blue-900' >{market.exchangesList.length}</span>
                            </p>
                        </li>
                        <li className='min-w-max' >
                            <p className='text-xs' >
                                Market cap:&nbsp;<span className='text-blue-900' >{market.status.data.total_market_cap.eur}€</span>
                            </p>
                        </li>
                        <li className='min-w-max' >
                            <p className='text-xs' >
                                24h Volume:&nbsp;<span className='text-blue-900' >{market.status.data.total_volume.eur}€</span>
                            </p>
                        </li>
                    </ul>
                    <ul className='flex items-center gap-6 text-white' >
                        <li className='min-w-max' >
                            <button className='text-xs flex items-center gap-1 bg-gray-800 rounded-full px-3 text-gray-700 hover:text-white transition' >
                                English&nbsp;<small className='text-base transform rotate-90 block' >&#x2023;</small>
                            </button>
                        </li>
                        <li className='min-w-max' >
                            <button className='text-xs flex items-center gap-1 bg-gray-800 rounded-full px-3 text-gray-700 hover:text-white transition' >
                                <b>€&nbsp;</b>Eur&nbsp;<small className='text-base transform rotate-90 block' >&#x2023;</small>
                            </button>
                        </li>
                    </ul>
                </>
                : null
            }
        </section>
    );
}