import React, { useState, useContext, createContext, } from "react";
import axios from "axios";

import { useLocalStorage } from "./use-local-storage";
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
    const [storedToken, setStoredToken] = useLocalStorage('_token', {});

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
                        if (storedToken || storedUser) {
                            setUser(null);
                            sessionStorage.clear();
                            localStorage.clear();
                        }
                        setUser(response.data.user);
                        setStoredUser(response.data.user);
                        setToken(response.data.token);
                        setStoredToken(response.data.token);
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
                "Authorization": `Bearer ${token ? token : storedToken}`
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

    const getCurrentUser = (id) => {
        setPending(true);
        axios({
            method: "GET",
            url: `${baseApiUrl}/api/user/${id}`,
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "true",
                "Authorization": `Bearer ${token ? token : storedToken}`
            }
        })
            .then((response) => {
                setUser(response.data);
                setStoredUser(response.data);
                setPending(false);
            })
            .catch((error) => {
                setError(error.message);
                setPending(false);
            });
    }

    return {
        user,
        storedUser,
        storedToken,
        error,
        pending,
        login,
        logout,
        getCurrentUser
    };
}