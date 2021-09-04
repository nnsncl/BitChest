import React, { useState, useReducer, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import { useAuth } from "../hooks/use-auth";
import { useTransactions } from "../hooks/use-transactions";
import { CoinsContext } from "../hooks/use-currencies";

import { Loader } from "../components/Loader";
import { Layout } from "../components/Layout";
import { Table } from "../components/Table";
import { GraphUp } from "../components/Icons";
import { TransactionsModule } from "../components/TransactionsModule";

import { MARKETPLACE } from "../routes/routes";

import { container, article } from "../animations/motion";

const ACTIONS = {
  COMPOSE_PORTFOLIO: "compose_portfolio",
  FORMAT_PORTFOLIO_ENTRIES: "format_portfolio_entries",
};

export default function Portfolio() {
  const auth = useAuth();
  const userTransactions = useTransactions();
  const { refs, storedCoins } = useContext(CoinsContext);

  const [totalCoinsTableVisible, setTotalCoinsTableVisible] = useState(true);
  const [transactionsTableVisible, setTransactionsTableVisible] = useState(true);

  const [portfolio, dispatch] = useReducer(PortfolioReducer, []);
  const [finalPortfolio, setFinalPortfolio] = useState([]);

  function PortfolioReducer(state, action) {
    switch (action.type) {
      case ACTIONS.COMPOSE_PORTFOLIO:
        return userTransactions.methods.ReducePortfolio(
          userTransactions.provider.transactions,
          "currency_name"
        );
      case ACTIONS.FORMAT_PORTFOLIO_ENTRIES:
        return Array.from(
          action.payload.portfolio.reduce(
            (accumulator, { name, type, currency_quantity }) =>
              accumulator.set(
                name,
                type === 1
                  ? (accumulator.get(name) || 0) + Number(currency_quantity)
                  : (accumulator.get(name) || 0) - Number(currency_quantity)
              ),
            new Map()
          ),
          ([name, currency_quantity]) => ({
            name,
            currency_quantity,
          })
        );
      default:
        return state;
    }
  }

  useEffect(() => {
    userTransactions.provider.getTransactions(
      auth.storedUser.id,
      auth.storedToken
    );
    userTransactions.provider.transactions
      && dispatch({ type: ACTIONS.COMPOSE_PORTFOLIO });

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // portfolio.length === 0 &&
    //   dispatch({
    //     type: ACTIONS.FORMAT_PORTFOLIO_ENTRIES,
    //     payload: { portfolio: portfolio },
    //   });
    if (finalPortfolio.length === 0 && portfolio.length !== 0) {
      dispatch({
        type: ACTIONS.FORMAT_PORTFOLIO_ENTRIES,
        payload: { portfolio: portfolio },
      });
      setFinalPortfolio(portfolio);
    }
  }, [portfolio]);

  console.log(portfolio);

  if (!userTransactions.provider.transactions) {
    return <Loader />;
  }

  return (
    <Layout>
      <header className="mb-12">
        <h1 className='text-3xl font-bold mb-2'>Hi {auth.storedUser.name},</h1>
        <p className="text-sm text-gray-700">
          Manage your every coin with ease.
        </p>
      </header>

      <section className="flex md:flex-row flex-col items-start gap-6 mb-6">

        {
          userTransactions.provider.transactions.length === 0
            ? <div className="md:w-3/4 w-full bg-black rounded-2xl p-9 flex flex-col items-center">
              <h3 className="text-base font-bold">Nothing here at the moment.</h3>
              <p className="text-gray-700 text-sm mb-6">You don't have any transaction registered yet</p>
              <span>
                <Link to={MARKETPLACE} className='text-xs bg-blue-900 px-6 py-3 rounded-lg w-full text-center'>
                  Visit Marketplace
                </Link>
              </span>
            </div>
            : <div className="md:w-3/4 w-full">
              <div className="flex items-center justify-between gap-6 mb-3">
                <h3 className="text-base font-light">Recent Activity</h3>
                <button
                  onClick={() => setTransactionsTableVisible(!transactionsTableVisible)}
                  className="flex items-center gap-3 font-light text-xs py-2 px-4 border-2 border-gray-800 hover:bg-gray-800 rounded-full outline-none">
                  Details
                  {transactionsTableVisible
                    ? <small>&#x25BC;</small>
                    : <small>&#x25B2;</small>
                  }
                </button>
              </div>
              {transactionsTableVisible && (
                <Table boxed>
                  {userTransactions.provider.transactions.map((item, key) => (
                    <motion.tr
                      key={key}
                      initial="hidden"
                      animate="visible"
                      variants={container}
                      className="rounded-b-2xl flex items-center justify-between gap-6 text-white p-6 gap-6 border-gray-800">
                      <motion.td
                        variants={article}
                        className="flex flex-col items-center justify-start" >
                        <p className="text-gray-700">
                          {moment(item.created_at).format("MMM")}
                        </p>
                        <p>{moment(item.created_at).format("DD")}</p>
                      </motion.td>
                      <motion.td className="flex items-center justify-start gap-3">
                        <p className="flex flex-col text-sm">
                          {item.type === 1 ? "Purchase" : "Sell"}
                        </p>
                      </motion.td>
                      <motion.td className="w-1/4 flex items-center justify-start gap-3">
                        <p className="flex items-center text-sm gap-2">
                          {refs.filter((ref) => ref.id === item.currency_id)[0].name}
                          <span className="block text-xs font-bold border-2 border-gray-800 rounded-lg px-2 py-1 uppercase text-gray-700 ">
                            {refs.filter((ref) => ref.id === item.currency_id)[0].symbol}
                          </span>
                        </p>
                      </motion.td>
                      <motion.td className="w-2/4 flex flex-col items-end justify-end">
                        <p className={`${item.type === 1 ? "text-green-900" : "text-red-900"} uppercase flex gap-3 text-sm`}>
                          {item.type === 1 ? "+" : "-"}
                          {item.currency_quantity.toFixed(5)}&nbsp;
                          {refs.filter((ref) => ref.id === item.currency_id)[0].symbol}
                        </p>
                        <p className="flex justify-end text-gray-700">
                          {item.type === 1 ? "-" : "+"}
                          {item.transaction_amount}€
                        </p>
                      </motion.td>
                    </motion.tr>
                  ))}
                </Table>
              )}

              <div className="flex items-center justify-between gap-6 mb-3 mt-10">
                <h3 className="text-base font-light">Your assets</h3>
                <button
                  onClick={() => setTotalCoinsTableVisible(!totalCoinsTableVisible)}
                  className="flex items-center gap-3 font-light text-xs py-2 px-4 border-2 border-gray-800 hover:bg-gray-800 rounded-full outline-none"
                >
                  <GraphUp />
                  Tradable assets
                  {totalCoinsTableVisible
                    ? <small>&#x25BC;</small>
                    : <small>&#x25B2;</small>
                  }
                </button>
              </div>
              {(portfolio && totalCoinsTableVisible)
                && <Table
                  boxed
                  headings={
                    <>
                      <th className="w-2/4 text-left text-xs">Coin Name</th>
                      <th className="w-1/4 text-right text-xs">Total Balance</th>
                      <th className="w-1/4 text-right text-xs">Total Coin</th>
                    </>
                  }
                >
                  {portfolio.map((item, key) => (
                    <motion.tr
                      key={key}
                      initial="hidden"
                      animate="visible"
                      variants={container}
                      className="rounded-b-2xl flex items-center justify-between gap-6 text-white p-6 gap-6 border-t-2 border-gray-800">
                      <motion.td
                        variants={article}
                        className="w-2/4 flex items-center justify-start gap-3">
                        <img
                          className="w-9 h-9 bg-white rounded-full"
                          src={storedCoins.filter((coin) => coin.coin_id === item.name)[0].image}
                          alt={`${item.name}-logo`}
                        />
                        <p className="flex items-center text-sm gap-2">
                          {storedCoins.filter((coin) => coin.coin_id === item.name)[0].name}
                          <span className="text-gray-700 text-xs uppercase">
                            {item.symbol}
                          </span>
                        </p>
                      </motion.td>
                      <motion.td className="flex text-sm gap-2 items-end justify-end">
                        <p className="flex text-sm gap-1 items-center justify-center" >
                          {(item.currency_quantity
                            * storedCoins.filter((coin) => coin.coin_id === item.name)[0].current_price).toFixed(2)
                          }€
                        </p>
                      </motion.td>
                      <motion.td className="flex text-sm gap-2 items-end justify-end">
                        <p className="flex text-sm gap-1 items-center justify-center" >
                          {item.currency_quantity.toFixed(5)}
                          <span className="block text-xs font-bold border-2 border-gray-800 rounded-lg px-2 py-1 uppercase text-gray-700 ">
                            {refs.filter((ref) => ref.coin_id === item.name)[0].symbol}
                          </span>
                        </p>
                      </motion.td>
                    </motion.tr>
                  ))}
                </Table>
              }
            </div>
        }
        <div className="md:w-1/4 w-full">
          <div className="flex items-center justify-between gap-6 mb-3">
            <p className="text-sm font-bold">
              <span className="gradient-text">Current&nbsp;</span>balance:
            </p>
            <span className="text-xs font-bold py-2 px-4 border-2 border-gray-800 rounded-full outline-none">
              {auth.storedUser.balance}€&nbsp;
              <span className="uppercase font-light text-gray-700">(EUR)</span>
            </span>
          </div>
          <TransactionsModule width="w-100" />
        </div>
      </section>
    </Layout>
  );
}
