import { useState, useEffect, useReducer, createContext, useContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { useLocalStorage } from "./use-local-storage";
import { useAuth } from "./use-auth";

const ACTIONS = {
    COMPOSE_PORTFOLIO: "compose_portfolio",
    FORMAT_PORTFOLIO_ENTRIES: "format_portfolio_entries",
};

const METHODS = {
    ROICalculator: (fvi, ivi, coi) => {
        const difference = fvi - ivi;
        const COIdivider = difference / coi;
        const COImultiplier = COIdivider * 100;

        return COImultiplier;
    },
    ReducePortfolio: (array, properties) => {
        return array.reduce((accumulator, object, index) => {
            const key = object[properties];
            accumulator.push({
                name: key,
                currency_quantity: object.currency_quantity,
                type: object.type
            });

            return accumulator;
        }, []);
    }
};

export const TransactionsContext = createContext([]);
export const TransactionsProvider = ({ children }) => {
    const auth = useAuth();
    const provider = useTransactionsProvider();
    const methods = METHODS;

    const [vault, setVault] = useLocalStorage('_vault', []);

    const [portfolio, dispatch] = useReducer(PortfolioReducer, []);
    const [portfolioUpdated, setPortfolioUpdated] = useState(false);

    function PortfolioReducer(state, action) {
        switch (action.type) {
            case ACTIONS.COMPOSE_PORTFOLIO:
                return METHODS.ReducePortfolio(
                    provider.transactions,
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
        };
    };
    useEffect(() => {
        auth.user
            && provider.getTransactions(
                auth.storedUser.id,
                auth.storedToken
            );

        provider.transactions
            && dispatch({
                type: ACTIONS.COMPOSE_PORTFOLIO
            });

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!portfolioUpdated && portfolio.length !== 0) {
            dispatch({
                type: ACTIONS.FORMAT_PORTFOLIO_ENTRIES,
                payload: { portfolio: portfolio },
            });
            setPortfolioUpdated(true);
        };
        setVault(portfolio);
        //eslint-disable-next-line
    }, [portfolio]);

    return (
        <TransactionsContext.Provider value={{ provider, methods, vault }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    return useContext(TransactionsContext);
};

function useTransactionsProvider() {
    const auth = useAuth();
    const [transactions, setTransactions] = useLocalStorage('_transactions', null);

    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [pending, setPending] = useState();

    const getTransactions = (id, token) => {
        setPending(true);
        axios({
            method: "GET",
            url: `${baseApiUrl}/api/user/${id}/transactions`,
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "true",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                auth.getCurrentUser(auth.storedUser.id); // Update storedUser after a transaction to get the current balance.
                setTransactions(response.data);
                setPending(false);
                setSuccess(true);
            })
            .catch((error) => {
                setError(error.message);
                setPending(false);
                setSuccess(false);
            });
    };

    return {
        transactions,
        getTransactions,
        success,
        error,
        pending,
    };
};
