import React, { useState, useContext, createContext, } from "react";
import axios from "axios";

import { useLocalStorage } from "./use-local-storage";

import {
    SESSION_KEY,
    SESSION_TOKEN,
} from "../constants/session";
import { baseApiUrl } from '../constants/api-endpoints';


const authContext = createContext();
export function AuthProvider({ children }) {
    const auth = useAuthProvider();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
};

function useAuthProvider() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState();
    const [pending, setPending] = useState();

    const [storedUser, setStoredUser] = useLocalStorage('_user', {});

    const login = (email, password) => {
        setPending(true);
        axios
            .get(`${baseApiUrl}/sanctum/csrf-cookie`, {
                method: "GET",
                withCredentials: true,
            })
            .then(() => {
                axios({
                    method: "POST",
                    url: `${baseApiUrl}/api/login`,
                    withCredentials: true,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "true",
                    },
                    data: {
                        email: email,
                        password: password,
                    },
                })
                    .then((response) => {
                        if (SESSION_TOKEN || storedUser) {
                            setUser(null);
                            sessionStorage.clear();
                            localStorage.clear();
                        }
                        setUser(response.data.user);
                        setStoredUser(response.data.user);
                        setToken(response.data.token);
                        sessionStorage.setItem(SESSION_KEY, response.data.token);
                        setPending(false);
                        return {
                            user: response.data.user,
                            token: response.data.token
                        };
                    })
                    .catch((error) => {
                        setError(error.message);
                        setPending(false);
                    });
            });
    };

    const logout = () => {
        setPending(true);
        axios({
            method: "POST",
            url: `${baseApiUrl}/api/logout`,
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "true",
                "Authorization": `Bearer ${token ? token : SESSION_TOKEN}`
            }
        })
            .then(() => {
                sessionStorage.clear();
                localStorage.clear();
            })
            .then(() => {
                setUser(null);
                setToken(null);
                setPending(false);
                window.location.reload();
            })
            .catch((error) => {
                setError(error.message);
                setPending(false);
            });
    };

    return {
        user,
        storedUser,
        error,
        pending,
        login,
        logout
    };
}