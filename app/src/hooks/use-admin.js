import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { SESSION_TOKEN } from "../constants/session";

import { useAuth } from "./use-auth";
import { useLocalStorage } from "./use-local-storage";
export const AdminContext = createContext([]);

export const AdminProvider = ({ children }) => {
  const auth = useAuth();
  const actions = useAdminProvider();
  const [users, setUsers] = useLocalStorage('_users', []);

  useEffect(() => {
    (auth.storedUser.elevation === 'admin' && users.length === 0) &&
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
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    //eslint-disable-next-line
  }, [])

  return (
    <AdminContext.Provider value={{ actions }}>
      {children}
    </AdminContext.Provider>
  );
};

function useAdminProvider() {
  const [storedUsers, setStoredUsers] = useLocalStorage('_users', []);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [pending, setPending] = useState();

  const getUsers = () => {
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
        setStoredUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const createUser = (user) => {
    setPending(true);
    axios({
      method: "POST",
      url: `${baseApiUrl}/api/register`,
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${SESSION_TOKEN}`
      },
      data: user,
    })
      .then(() => {
        setPending(false);
        setSuccess(true);
        setStoredUsers([...storedUsers, user]);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }
  const updateUser = (id, user) => {
    setPending(true);
    axios({
      method: "PUT",
      url: `${baseApiUrl}/api/user/${id}`,
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${SESSION_TOKEN}`
      },
      data: user,
    })
      .then(() => {
        setPending(false);
        setSuccess(true);
        getUsers();
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }
  const deleteUser = (id) => {
    setPending(true);
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
      .then(() => {
        setPending(false);
        setSuccess(true);
        getUsers();
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
        setSuccess(false);
      });
  }

  return {
    storedUsers,
    success,
    error,
    pending,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
}
