import axios from "axios";
import React, { useState, useContext } from "react";
import { CoinsContext } from "../hooks/use-currencies";
import { baseApiUrl } from "../constants/api-endpoints";

import { Swap, Diamond } from "./Icons";
import { useAuth } from "../hooks/use-auth";

export const TransactionsModule = ({ position }) => {
  const auth = useAuth();
  const { storedCoins } = useContext(CoinsContext);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [transactionMode, setTransactionMode] = useState(true);
  const [balanceAmount, setBalanceAmount] = useState(0);

  const [transaction, setTransaction] = useState({
    currency_value: null,
    currency_id: null,
    type: transactionMode,
    user_id: auth.storedUser.id,
    transaction_amount: null,
    currency_quantity: null,
  });

  function handlePurchase(e) {
    e.preventDefault();
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(transaction);

  return (
    <article
      className={`${
        position ? position : "bottom-20"
      } right-6 bg-black text-gray-700 fixed rounded-2xl shadow-xl md:w-96 w-80 z-90`}
    >
      <ul className="flex w-full">
        <li
          className={`w-1/2 py-6 flex items-center justify-center ${
            transactionMode && "border-b-2 text-blue-900"
          }`}
        >
          <button
            className="hover:text-blue-900 text-sm"
            onClick={() => setTransactionMode(true)}
          >
            Buy
          </button>
        </li>
        <li
          className={`w-1/2 py-6 flex items-center justify-center ${
            !transactionMode && "border-b-2 text-blue-900"
          }`}
        >
          <button
            className="hover:text-blue-900 text-sm"
            onClick={() => setTransactionMode(false)}
          >
            Sell
          </button>
        </li>
      </ul>
      {transactionMode ? (
        <form
          className="px-6 py-9 flex flex-col gap-6"
          onSubmit={(e) => handlePurchase(e)}
        >
          <fieldset className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
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
                        className="text-xs font-regular"
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              {storedCoins[selectedCoin] && storedCoins[selectedCoin].image ? (
                <img
                  className="w-8 h-8 bg-white rounded-full"
                  src={storedCoins[selectedCoin].image}
                  alt={`${storedCoins[selectedCoin].image.name}-logo`}
                />
              ) : (
                <small className="text-white text-xs">▼</small>
              )}
            </div>
          </fieldset>
          <fieldset className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
            <label htmlFor="transaction_amount" className="text-xs mb-1">
              Amount (EUR)
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
          </fieldset>
          <fieldset className="flex flex-col rounded-lg border-2 border-gray-800 bg-gray-900 py-4 px-3 outline-none">
            <label htmlFor="transaction_amount" className="text-xs mb-1">
              Amount&nbsp;
              <span className="uppercase">
                ({storedCoins[selectedCoin] && storedCoins[selectedCoin].symbol}
                )
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
          </fieldset>
          <button
            className="bg-blue-900 py-4 rounded-lg text-white disabled:opacity-30"
            disabled={selectedCoin ? false : true}
          >
            Buy
          </button>
        </form>
      ) : (
        "sell"
      )}
    </article>
  );
};
