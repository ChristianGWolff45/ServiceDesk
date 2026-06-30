import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

export function useTicketsRequester(token) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getMyTickets() {
    try {
      const response = await fetch(`${API_URL}/tickets/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("data ", data);
      setTickets(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyTickets();
  }, [token]);

  return { tickets, loading };
}
