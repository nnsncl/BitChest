import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from 'framer-motion';

import { useAuth } from "../hooks/use-auth";
import { CoinsContext } from "../hooks/use-currencies";
import { baseApiUrl } from "../constants/api-endpoints";

import { Swap, Diamond, Processing } from "./Icons";
import { container, article, transactions_container, transactions_article } from '../animations/motion';


export const TransactionsModule = ({ position }) => {
  const auth = useAuth();
  const { storedCoins } = useContext(CoinsContext);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [transactionMode, setTransactionMode] = useState(true);
  const [balanceAmount, setBalanceAmount] = useState(0);

  const BASE_TRANSACTION = {
    currency_value: null,
    currency_id: null,
    type: transactionMode,
    user_id: auth.storedUser.id,
    transaction_amount: null,
    currency_quantity: null,
  }
  const [transaction, setTransaction] = useState(BASE_TRANSACTION);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function handlePurchase(e) {
    e.preventDefault();
    setPending(true);
    axios({
      method: "POST",
      url: `${baseApiUrl}/api/transactions`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
      },
      data: transaction,
    })
      .then((response) => {
        setSuccess(response.data.message);
        setPending(false);
        setError(false);
      })
      .catch((error) => {
        setPending(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000)
    }
  }, [success])

  return (
    <>
      <motion.article
        initial='hidden'
        animate='visible'
        variants={transactions_container}
        className={`${position ? position : "bottom-20"} right-6 bg-black text-gray-700 fixed rounded-2xl shadow-xl md:w-96 w-80 z-90`} >

        <motion.ul 
        variants={transactions_article}
        className="flex w-full">
          <motion.li variants={transactions_article} className={`w-1/2 py-6 flex items-center justify-center ${transactionMode && "border-b-2 text-blue-900"}`} >
            <button
              className="hover:text-blue-900 text-sm"
              onClick={() => setTransactionMode(true)} >
              Buy
            </button>
          </motion.li>
          <motion.li variants={transactions_article} className={`w-1/2 py-6 flex items-center justify-center ${!transactionMode && "border-b-2 text-blue-900"}`}>
            <button
              className="hover:text-blue-900 text-sm"
              onClick={() => setTransactionMode(false)}>
              Sell
            </button>
          </motion.li>
        </motion.ul>

        {transactionMode
          ? <motion.form
              initial='hidden'
              animate='visible'
              variants={transactions_container}
            className="px-6 py-9 flex flex-col gap-6"
            onSubmit={(e) => handlePurchase(e)}>
            {error &&
              <section className='bg-red-900 text-sm p-6 rounded-xl' >
                {error}
              </section>}
            {success &&
              <motion.section
                            initial='hidden'
              animate='visible'
              variants={container}
              className='border-2 border-gray-800  p-6 rounded-xl' >
                <div className=' flex items-baseline gap-3' >
                  <Diamond />
                  <motion.div   variants={article}>
                    <h3 className='font-bold text-lg gradient-text mb-2' >{success}</h3>
                    <p className='text-sm text-white' >A new transaction has been added to your portfolio.</p>
                  </motion.div>
                </div>
              </motion.section>}

            <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
              <label htmlFor="coin" className="text-xs mb-1">
                Coin Name
              </label>
              <div className="flex w-full justify-between items-center ">
                <select
                  onChange={(e) => {
                    setSelectedCoin(e.target.value);
                    setTransaction({
                      ...transaction,
                      currency_id: Number(e.target.value) + 1,
                      currency_value: storedCoins[e.target.value] ? storedCoins[e.target.value].current_price : null,
                    });
                  }}
                  name="coin"
                  id="coin-select"
                  className="bg-transparent w-full appearance-none outline-none text-white"
                >
                  <option value="">Select a currency</option>
                  {storedCoins &&
                    storedCoins.map((item, key) => {
                      return (
                        <option
                          key={key}
                          value={key}
                          className="text-xs font-regular"  >
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                {storedCoins[selectedCoin] && storedCoins[selectedCoin].image
                  ? (
                    <img
                      className="w-8 h-8 bg-white rounded-full"
                      src={storedCoins[selectedCoin].image}
                      alt={`${storedCoins[selectedCoin].image.name}-logo`}
                    />)
                  : <small className="text-white text-xs">▼</small>
                }
              </div>
            </motion.fieldset>
            <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
              <label htmlFor="transaction_amount" className="text-xs mb-1">
                Amount&nbsp;(EUR)
              </label>
              <div className="flex w-full justify-between items-center ">
                <input
                  type="number"
                  onChange={(e) => {
                    setBalanceAmount(e.target.value);
                    setTransaction({
                      ...transaction,
                      transaction_amount: Number(e.target.value),
                      currency_quantity: Number(
                        e.target.value /
                        (storedCoins[selectedCoin] &&
                          storedCoins[selectedCoin].current_price)
                      ),
                    });
                  }}
                  name="transaction_amount"
                  placeholder="10"
                  defaultValue=""
                  min={0}
                  className="w-full bg-transparent text-xs font-bold text-white appearance-none outline-none"
                />
                <small className="text-white text-xs">
                  <Swap />
                </small>
              </div>
            </motion.fieldset>
            <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
              <label htmlFor="transaction_amount" className="text-xs mb-1">
                Amount&nbsp;
                <span className="uppercase">
                  ({storedCoins[selectedCoin] && storedCoins[selectedCoin].symbol} )
                </span>
              </label>
              <div className="flex w-full justify-between items-center ">
                <p className="bg-transparent text-xs font-bold text-white appearance-none outline-none">
                  {storedCoins[selectedCoin]
                    ? (
                      (balanceAmount && selectedCoin && balanceAmount) /
                      (storedCoins[selectedCoin] &&
                        storedCoins[selectedCoin].current_price)
                    ).toFixed(2)
                    : 0}
                </p>
                <small className="text-white text-xs">
                  <Diamond />
                </small>
              </div>
            </motion.fieldset>

            <button
              className='bg-blue-900 py-4 rounded-lg text-white flex items-center justify-center disabled:opacity-30 text-xs uppercase font-bold'
              disabled={!selectedCoin || pending ? true : false} >
              {storedCoins[selectedCoin] && storedCoins[selectedCoin].name
                ? pending
                  ? <Processing />
                  : `Buy ${storedCoins[selectedCoin].name}`
                : 'Select a currency'
              }
            </button>

          </motion.form>
          : "sell"
        }

      </motion.article>
    </>
  );
};
