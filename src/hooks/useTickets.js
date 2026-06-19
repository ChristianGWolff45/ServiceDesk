import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

export function useTickets() {
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
      const response = await fetch(`${API_URL}/tickets`);
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
  }, []);
  // tickets =
  //   status === "ALL_TICKETS"
  //     ? allTickets
  //     : allTickets.filter((ticket) => ticket.status === status);
  // tickets =
  //   priority === "ALL_PRIORITY"
  //     ? tickets
  //     : tickets.filter((ticket) => ticket.priority === priority);

  // tickets =
  //   assigneeId === "All Assignee"
  //     ? tickets
  //     : tickets.filter((ticket) => ticket.assigneeId === assigneeId);

  // tickets =
  //   category === "All Categories"
  //     ? tickets
  //     : tickets.filter((ticket) => ticket.category === category);

  // tickets = !search
  //   ? tickets
  //   : tickets.filter((ticket) =>
  //       Object.values(ticket).some((value) =>
  //         !value ? false : value.toLowerCase().includes(search.toLowerCase()),
  //       ),
  //     );
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
  };
}
