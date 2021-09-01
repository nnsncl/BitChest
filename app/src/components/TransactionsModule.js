import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from 'framer-motion';

import { useAuth } from "../hooks/use-auth";
import { useTransactions } from "../hooks/use-transactions";
import { CoinsContext } from "../hooks/use-currencies";
import { baseApiUrl } from "../constants/api-endpoints";

import { Swap, Diamond, Processing } from "./Icons";
import { container, article, transactions_container, transactions_article } from '../animations/motion';


export const TransactionsModule = ({ position, width }) => {
  const auth = useAuth();
  const transactions = useTransactions();
  const { storedCoins, Converter } = useContext(CoinsContext);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [transactionMode, setTransactionMode] = useState(true);
  const [balanceAmount, setBalanceAmount] = useState(0);

  const BASE_TRANSACTION = {
    type: transactionMode,
    user_id: auth.storedUser.id,
    currency_value: null,
    currency_id: null,
    transaction_amount: null,
    currency_quantity: null,
    roi: null
  }
  const [transaction, setTransaction] = useState(BASE_TRANSACTION);

  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleTransaction = (e) => {
    e.preventDefault();
    setPending(true);
    axios({
      method: "POST",
      url: `${baseApiUrl}/api/transaction/${transactionMode ? 'purchase' : 'sell'}`,
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${auth.storedToken}`
      },
      data: transaction,
    })
      .then((response) => {
        transactions.actions.getTransactions(auth.storedUser.id, auth.storedToken);
        setPending(false);
        setError(false);
        setSuccess(response.data.message);
      })
      .catch((error) => {
        setPending(false);
        setError(error.message);
      });
  };

  const handlePurchase = (value) => {
    if (value > auth.storedUser.balance) {
      setBalanceAmount(auth.storedUser.balance);
      return;
    }
    setBalanceAmount(value);
    setTransaction({
      ...transaction,
      transaction_amount: Number(value),
      currency_quantity: Number(
        value /
        (storedCoins[selectedCoin] &&
          storedCoins[selectedCoin].current_price)
      ),
    });
  };

  const handleSell = (value) => {
    setBalanceAmount(value);
    setTransaction({
      ...transaction,
      transaction_amount: Number(
        value *
        (storedCoins[selectedCoin] &&
          storedCoins[selectedCoin].current_price)
      ),
      currency_quantity: Number(value),
      roi: 0
    });
  };

  const handleSelect = (value) => {
    setSelectedCoin(value);
    setTransaction({
      ...transaction,
      currency_id: Number(value) + 1,
      currency_value: storedCoins[value] ? storedCoins[value].current_price : null,
    });
  };

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
        className={`${position ? position : ""}  ${width ? '' : 'md:w-96 w-80'} bg-black text-gray-700 rounded-2xl shadow-xl z-90`} >

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

        <motion.form
          initial='hidden'
          animate='visible'
          variants={transactions_container}
          className="px-6 py-9 flex flex-col gap-6"
          onSubmit={(e) => handleTransaction(e)}>

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
                <motion.div variants={article}>
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
                onChange={(e) => handleSelect(e.target.value)}
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

          {transactionMode
            ? <>
              <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
                <label htmlFor="transaction_amount" className="text-xs mb-1">
                  Amount&nbsp;(EUR)
                </label>
                <div className="flex w-full justify-between items-center ">
                  <input
                    type="number"
                    onChange={(e) => handlePurchase(e.target.value)}
                    value={balanceAmount}
                    name="transaction_amount"
                    placeholder="10"
                    min={0}
                    max={auth.storedUser.balance}
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
                    ({storedCoins[selectedCoin] && storedCoins[selectedCoin].symbol})
                  </span>
                </label>
                <div className="flex w-full justify-between items-center ">
                  <p className="bg-transparent text-xs font-bold text-white appearance-none outline-none">
                    {storedCoins[selectedCoin]
                      ? Converter(balanceAmount, selectedCoin, storedCoins, 'purchase')
                      : null
                    }
                  </p>
                  <small className="text-white text-xs">
                    <Diamond />
                  </small>
                </div>
              </motion.fieldset>
            </>
            : <>
              <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
                <label htmlFor="transaction_amount" className="text-xs mb-1">
                  Amount&nbsp;
                  <span className="uppercase">
                    ({storedCoins[selectedCoin] && storedCoins[selectedCoin].symbol})
                  </span>
                </label>
                <div className="flex w-full justify-between items-center ">

                  <input
                    type="number"
                    onChange={(e) => handleSell(e.target.value)}
                    value={balanceAmount}
                    name="transaction_amount"
                    placeholder="10"
                    min={0}
                    max={auth.storedUser.balance}
                    className="w-full bg-transparent text-xs font-bold text-white appearance-none outline-none"
                  />
                  <small className="text-white text-xs">
                    <Diamond />
                  </small>
                </div>
              </motion.fieldset>
              <motion.fieldset variants={transactions_article} className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
                <label htmlFor="transaction_amount" className="text-xs mb-1">
                  Amount&nbsp;(EUR)
                </label>
                <div className="flex w-full justify-between items-center ">
                  <p className="bg-transparent text-xs font-bold text-white appearance-none outline-none">
                    {storedCoins[selectedCoin]
                      ? Converter(balanceAmount, selectedCoin, storedCoins, 'sell')
                      : null
                    }
                  </p>
                  <small className="text-white text-xs">
                    <Swap />
                  </small>
                </div>
              </motion.fieldset>
            </>
          }

          <button
            className='bg-blue-900 py-4 rounded-lg text-white flex items-center justify-center disabled:opacity-30 text-xs uppercase font-bold'
            disabled={!selectedCoin || pending ? true : false} >
            {storedCoins[selectedCoin] && storedCoins[selectedCoin].name
              ? pending
                ? <Processing />
                : `${transactionMode ? 'Buy' : 'Sell'} ${storedCoins[selectedCoin].name}`
              : 'Select a currency'
            }
          </button>
        </motion.form>

      </motion.article>
    </>
  );
};
