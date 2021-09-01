import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";

import { useAuth } from "./use-auth";
import { useLocalStorage } from "./use-local-storage";


export const TransactionsContext = createContext([]);
export const TransactionsProvider = ({ children }) => {
  const auth = useAuth();
  const actions = useTransactionsProvider();
  const [transactions, setTransactions] = useLocalStorage('_transactions', []);

  useEffect(() => {
    (auth.storedUser.id && auth.storedToken) &&
      axios({
        method: "GET",
        url: `${baseApiUrl}/api/user/${auth.storedUser.id}/transactions`,
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "true",
          "Authorization": `Bearer ${auth.storedToken}`
        }
      })
        .then((response) => {
            auth.getCurrentUser(auth.storedUser.id);
            setTransactions(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    //eslint-disable-next-line
  }, [auth.storedUser.balance])

  return (
    <TransactionsContext.Provider value={{ transactions, actions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactionsProvider() {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [pending, setPending] = useState();


  return {
    success,
    error,
    pending,
  };
}
