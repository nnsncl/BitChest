import React, { useState, useContext, createContext, } from "react";
import axios from "axios";

import {
    SESSION_KEY,
    _ID_KEY,
    SESSION_TOKEN,
    _ID
} from "../constants/session-storage-endpoints";
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
                        if (SESSION_TOKEN) {
                            setUser(null);
                            sessionStorage.clear();
                        }
                        setUser(response.data.user);
                        setToken(response.data.token);
                        sessionStorage.setItem(SESSION_KEY, response.data.token);
                        sessionStorage.setItem(_ID_KEY, response.data.user.id);
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

    const getAuthUser = () => {
        setPending(true);
        if (!user && SESSION_TOKEN) {
            axios({
                method: "GET",
                url: `${baseApiUrl}/api/user/${user && user.id ? user.id : _ID}`,
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "true",
                    "Authorization": `Bearer ${token ? token : SESSION_TOKEN}`
                }
            })
                .then((response) => {
                    setUser(response.data);
                    setPending(false);
                    return {
                        user: response.data.user
                    };
                })
                .catch((error) => {
                    setError(error.message);
                    setPending(false);
                });
        };
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
        error,
        pending,
        getAuthUser,
        login,
        logout
    };
}