import { API_URL } from "./API_URL";
import { useState, useContext, useEffect, createContext } from "react";
import { useAuthContext } from "../context/AuthContext";
export function useAuth() {
  const [actionSuccess, setActionSuccess] = useState(false);
  const { login: storeData } = useAuthContext();
  async function registerNewUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  }) {
    setActionSuccess(false);
    try {
      const response = await fetch(`${API_URL}/auth/registerNewUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });
      if (!response.ok) {
        console.log(response);
        return;
      }

      const data = await response.json();
      storeData({ user: data.user, token: data.token });
    } catch (error) {
      console.log(error);
    } finally {
      setActionSuccess(true);
    }
  }
  async function login({ email, password }) {
    setActionSuccess(false);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        alert((await response.json()).message);
        setActionSuccess(false);
        return false;
      }
      setActionSuccess(true);
      const data = await response.json();
      storeData({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function getCurrentUser(token) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: { Authorization: token },
      });
      if (!response.ok) {
        console.log(response);
        return;
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return { error: "failed to retrieve user" };
    }
  }
  return { registerNewUser, actionSuccess, login };
}
