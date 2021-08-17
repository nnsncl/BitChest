import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            id: '12345-azerty',
            name: "Warner",
            email: "mail@mail.com",
            role: "admin",
            wallet: {
                currencies: []
            },
            available_funds: 2537.56,
        })
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
};