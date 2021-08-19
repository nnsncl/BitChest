import React, { useState, useContext, createContext, } from "react";
import axios from "axios";

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
                        email: "user75@mail.com",
                        password: "foo",
                    },
                })
                    .then(function (response) {
                        setUser(response.data.user);
                        setToken(response.data.token);
                        sessionStorage.setItem('SESSION_TOKEN', response.data.token);
                        sessionStorage.setItem('USER_ID', response.data.user.id);
                        return {
                            user: response.data.user,
                            token: response.data.token
                        };
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            });
    };

    const getAuthUser = () => {
        if (user) {
            axios({
                method: "GET",
                url: `${baseUrl}/api/user/${user.id}`,
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "true",
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    email: "user75@mail.com",
                    password: "foo",
                },
            })
                .then(function (response) {
                    setUser(response.data);
                    // setToken(response.data.token);
                    // return {
                    //     user: response.data.user,
                    //     token: response.data.token
                    // };
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }
    return {
        user,
        login,
        getAuthUser,
    };
}
