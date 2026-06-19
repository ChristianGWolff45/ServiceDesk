import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";
export function useTicket(ticketId) {
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(true);
  async function getTicket() {
    if (ticketId > 0) {
      try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error("failed to fetch ticket");
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getTicket();
  }, []);

  return { ticket, loading };
}
