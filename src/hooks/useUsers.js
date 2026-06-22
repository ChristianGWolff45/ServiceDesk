import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";
export function useUsers() {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  async function getUsers() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users`);
      const users = await response.json();
      setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, users };
}
