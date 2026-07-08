import { API_URL } from "./API_URL";
import { useState, useContext, useEffect, createContext } from "react";
import { useAuthContext } from "../context/AuthContext";
export function useAuth() {
  const { login: storeData } = useAuthContext();
  async function registerNewUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  }) {
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
        alert((await response.json()).message);
        return false;
      }

      const data = await response.json();
      storeData({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async function login({ email, password }) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        if (response.status === 403) {
          alert((await response.json()).message);
          return { success: false, passwordReset: true };
        }
        alert((await response.json()).message);
        return { success: false, passwordReset: false };
      }
      const data = await response.json();
      storeData({ user: data.user, token: data.token });
      return { success: true, passwordReset: false };
    } catch (error) {
      console.log(error);
      return { success: false, passwordReset: false };
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

  async function resetPassword(email, oldPassword, newPassword) {
    try {
      const response = await fetch(`${API_URL}/auth/resetPassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email, oldPassword, newPassword),
      });
      if (!response.ok) {
        console.log((await response.json()).message);
        return false;
      }
      const data = await response.json();
      storeData({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function adminResetPassword(token, password, userId) {
    try {
      const response = await fetch(`${API_URL}/auth/adminResetPassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, userId }),
      });
      if (!response.ok) {
        return console.log(response);
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async function getMe(token) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        return console.log((await response.json()).message);
      }
      const data = await response.json();
      return data.user.id;
    } catch (error) {
      console.log(error);
    }
  }
  return { registerNewUser, login, resetPassword, getMe, adminResetPassword };
}
