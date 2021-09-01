import { useState, createContext, useContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { useLocalStorage } from "./use-local-storage";


export const TransactionsContext = createContext([]);
export const TransactionsProvider = ({ children }) => {

    const actions = useTransactionsProvider();

    return (
        <TransactionsContext.Provider value={{ actions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    return useContext(TransactionsContext);
};


function useTransactionsProvider() {
    const [transactions, setTransactions] = useLocalStorage('_transactions', []);
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
                setTransactions(response.data);
                setPending(false);
                setSuccess(true);
            })
            .catch((error) => {
                setError(error.message);
                setPending(false);
                setSuccess(false);
            });
    }

    return {
        transactions,
        getTransactions,
        success,
        error,
        pending,
    };
}
