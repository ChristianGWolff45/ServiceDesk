import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";
export function useSupportStaff() {
  const [agents, setAgents] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getStaff() {
    try {
      const res = await fetch(`${API_URL}/users/staff`);
      if (!res.ok) {
        throw new Error(res);
      }
      const data = await res.json();
      setAgents(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStaff();
  }, []);
  return { agents, loading };
}
