import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            name: "Sami",
            email: "mail@mail.com",
            wallet: {
                currencies: [],
                total: 1000,
            },
        })
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
};