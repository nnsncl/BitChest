import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { baseApiUrl } from "../constants/api-endpoints";
import { SESSION_TOKEN } from "../constants/session";

import { useAuth } from "./use-auth";

export const AdminContext = createContext([]);

export const AdminProvider = ({ children }) => {
  const auth = useAuth();
  const actions = useAdminProvider();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (auth.user && auth.user.elevation === 'admin') &&
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
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [pending, setPending] = useState();

  const createUser = (user) => {
    setPending(true);
    axios({
      method: "POST",
      url: `${baseApiUrl}/api/user`,
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${SESSION_TOKEN}`
      },
      data: user,
    })
      .then((response) => {
        setPending(false);
        setSuccess(true);
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
      .then((response) => {
        setPending(false);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
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
        setPending(true);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
        setSuccess(false);
      });
  }

  return {
    success,
    error,
    pending,
    createUser,
    updateUser,
    deleteUser
  };
}
