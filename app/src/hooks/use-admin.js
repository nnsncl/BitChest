import { useState, useEffect, createContext } from "react";
import { baseApiUrl } from "../constants/api-endpoints";
import axios from "axios";

import { getSessionTokenCookie } from "../constants/session-storage-endpoints";

export const AdminContext = createContext([]);

export const AdminProvider = ({ children }) => {
  const actions = useAdminProvider();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
        method: "GET",
        url: `${baseApiUrl}/api/users`,
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "true",
          "Authorization": `Bearer ${getSessionTokenCookie}`
        }
      })
        .then((response) => {
            setUsers(response.data)
        })
        .catch((error) => {
          console.log(error.message);
        });

  }, [])

  return (
    <AdminContext.Provider value={{ users, actions }}>
      {children}
    </AdminContext.Provider>
  );
};

function useAdminProvider() {

    const createUser = () => {
        console.log('create user')
    }
    const updateUser = () => {
        console.log('update user')
    }
    const deleteUser = () => {
        console.log('delete user')
    }

  return {
    createUser,
    updateUser,
    deleteUser
  };
}
