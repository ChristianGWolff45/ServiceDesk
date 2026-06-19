import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";
export function useUser(userId) {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);

  async function getUser() {
    if (!userId) return;
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
  return { user, userLoading };
}
