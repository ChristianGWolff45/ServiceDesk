import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

export function useTickets(token) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("ALL_TICKETS");
  const [priority, setPriority] = useState("ALL_PRIORITY");
  const [category, setCategory] = useState("All Categories");
  const [assigneeId, setAssigneeId] = useState("All Assignee");
  const [search, setSearch] = useState("");
  async function getTickets() {
    try {
      let url = `${API_URL}/tickets`;
      if (status !== "ALL_TICKETS") {
        url += `?status=${status}`;
      }
      const response = await fetch(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("failed to fetch tickets");
      }
      const data = await response.json();
      console.log(data);
      setTickets(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(status);
    getTickets();
  }, [status]);

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
