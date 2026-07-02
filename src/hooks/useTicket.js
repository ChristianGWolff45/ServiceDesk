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

  async function updateStatus(status, token) {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.log("response", (await response.json()).message);
        return;
      }
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePriority(priority, token) {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priority }),
      });
      if (!response.ok) {
        console.log("response", (await response.json()).message);
        return;
      }
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function assignTo(token) {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/assignMe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log((await response.json()).message);
        return;
      }
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.log(error);
    }
  }
  return { ticket, loading, updateStatus, updatePriority, assignTo };
}
