import { useState, useEffect } from "react";
import allTickets from "../Data/tickets.json";

export function useTickets() {
  let tickets;
  const [status, setStatus] = useState("ALL_TICKETS");
  const [priority, setPriority] = useState("ALL_PRIORITY");
  const [category, setCategory] = useState("All Categories");
  const [assigneeId, setAssigneeId] = useState("All Assignee");
  const [search, setSearch] = useState("");
  tickets =
    status === "ALL_TICKETS"
      ? allTickets
      : allTickets.filter((ticket) => ticket.status === status);
  tickets =
    priority === "ALL_PRIORITY"
      ? tickets
      : tickets.filter((ticket) => ticket.priority === priority);

  tickets =
    assigneeId === "All Assignee"
      ? tickets
      : tickets.filter((ticket) => ticket.assigneeId === assigneeId);

  tickets =
    category === "All Categories"
      ? tickets
      : tickets.filter((ticket) => ticket.category === category);

  tickets = !search
    ? tickets
    : tickets.filter((ticket) =>
        Object.values(ticket).some((value) =>
          !value ? false : value.toLowerCase().includes(search.toLowerCase()),
        ),
      );
  return {
    tickets,
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
