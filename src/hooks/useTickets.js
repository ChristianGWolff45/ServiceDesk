import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

export function useTickets(token) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [category, setCategory] = useState(null);
  const [assigneeId, setAssigneeId] = useState(null);
  const [search, setSearch] = useState("");
  async function getTickets() {
    try {
      let url = `${API_URL}/tickets`;
      const params = new URLSearchParams();
      if (status) {
        params.append("status", `${status}`);
      }
      if (priority) {
        params.append("priority", `${priority}`);
      }
      if (category) {
        params.append("category", `${category}`);
      }
      if (assigneeId) {
        params.append("assigneeId", `${assigneeId}`);
      }
      const response = await fetch(`${url}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTickets();
  }, [status, priority, assigneeId, category]);

  async function createTicket({
    requesterId,
    title,
    location,
    category,
    errorMessage,
    description,
  }) {
    try {
      const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterId,
          title,
          location,
          category,
          errorMessage,
          description,
        }),
      });
      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    tickets,
    loading,
    error,
    status,
    setStatus,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    category,
    setCategory,
    search,
    setSearch,
    createTicket,
  };
}
