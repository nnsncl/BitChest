import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { SESSION_TOKEN } from "../constants/session-storage-endpoints";

import { useAuth } from "./use-auth";

export const AdminContext = createContext([]);

export const AdminProvider = ({ children }) => {
  const auth = useAuth();
  const actions = useAdminProvider();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // auth.user.elevation === 'admin' ??
      axios({
        method: "GET",
        url: `${baseApiUrl}/api/users`,
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "true",
          "Authorization": `Bearer ${SESSION_TOKEN}`
        }
      })
        .then((response) => {
          setUsers(response.data)
        })
        .catch((error) => {
          console.log(error.message);
        });
  }, [auth])

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
  const deleteUser = (id) => {
    axios({
      method: "DELETE",
      url: `${baseApiUrl}/api/user/${id}`,
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${SESSION_TOKEN}`
      }
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return {
    createUser,
    updateUser,
    deleteUser
  };
}
