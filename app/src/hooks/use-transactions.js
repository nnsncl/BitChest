import { useState, createContext, useContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { useLocalStorage } from "./use-local-storage";
import { useAuth } from "./use-auth";


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
    }

    return {
        transactions,
        getTransactions,
        success,
        error,
        pending,
    };
}
