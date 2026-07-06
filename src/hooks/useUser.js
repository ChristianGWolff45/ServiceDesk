import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";
export function useUser() {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  async function getUser() {
    setLoading(true);
    if (!userId) {
      setLoading(false);
      return setUser(null);
    }
    if (userId > 0) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    getUser();
  }, [userId]);

  return { user, userLoading, setUserId };
}
