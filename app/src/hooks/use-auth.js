import React, { useState, useContext, createContext, } from "react";
import axios from "axios";

import {
    SESSION_TOKEN_COOKIE_KEY,
    USER_ID_COOKIE_KEY,
    getSessionTokenCookie,
    getUserIDCookie
} from "../constants/session-storage-endpoints";


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

    const baseUrl = "http://localhost:8000";
    const login = (email, password) => {
        axios
            .get(`${baseUrl}/sanctum/csrf-cookie`, {
                method: "GET",
                withCredentials: true,
            })
            .then(() => {
                axios({
                    method: "POST",
                    url: `${baseUrl}/api/login`,
                    withCredentials: true,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "true",
                    },
                    data: {
                        email: "nuni@nuni.fr",
                        password: "nuni",
                    },
                })
                    .then((response) => {
                        if (getSessionTokenCookie) {
                            setUser(null);
                            sessionStorage.clear();
                        }
                        setUser(response.data.user);
                        setToken(response.data.token);
                        sessionStorage.setItem(SESSION_TOKEN_COOKIE_KEY, response.data.token);
                        sessionStorage.setItem(USER_ID_COOKIE_KEY, response.data.user.id);
                        return {
                            user: response.data.user,
                            token: response.data.token
                        };
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            });
    };

    const getAuthUser = () => {
        if (!user && getSessionTokenCookie) {
            axios({
                method: "GET",
                url: `${baseUrl}/api/user/${user && user.id ? user.id : getUserIDCookie}`,
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "true",
                    "Authorization": `Bearer ${token ? token : getSessionTokenCookie}`
                }
            })
                .then((response) => {
                    setUser(response.data);
                    return {
                        user: response.data.user
                    };
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };
    };

    const logout = () => {
        axios({
            method: "POST",
            url: `${baseUrl}/api/logout`,
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "true",
                "Authorization": `Bearer ${token ? token : getSessionTokenCookie}`
            }
        })
            .then(() => {
                setUser(null);
                setToken(null);
                sessionStorage.clear();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return {
        user,
        getAuthUser,
        login,
        logout
    };
}
