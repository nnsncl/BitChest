import React, { useState, useContext, createContext,  } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

import * as ROUTES from '../constants/routes';


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
    const history  = useHistory();
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
    return {
        user,
        token,
        login,
    };
}
