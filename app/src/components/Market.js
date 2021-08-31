import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { CoinsContext } from '../hooks/use-currencies';
import { container, article } from '../animations/motion';

import { GraphDown, GraphUp } from './Icons';


export const Market = () => {
    const { storedCoins } = useContext(CoinsContext);

    return (
        <motion.section
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
    );
}