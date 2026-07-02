import { TicketCard } from "./TicketCard";
import { useTickets } from "../hooks/useTickets";
import { TicketFilter } from "./TicketFilter";
import { TicketKanban } from "./TicketKanban";
import { List, Kanban } from "lucide-react";
import { useState } from "react";
import { TicketList } from "./TicketList";
import { useAuthContext } from "../context/AuthContext";

export function TicketBoard() {
  const [isKanban, setIsKanban] = useState(false);
  const { token } = useAuthContext();
  const {
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
  } = useTickets(token);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error {` ${error}`}</p>;
  return (
    <div>
      <div className="flex justify-between items-center text-6xl mt-16">
        <h1 className=" ml-16  text-emerald-900 font-bold">Ticket Board</h1>
        <div className="border flex items-center   mr-16 rounded-md">
          <button
            className={`cursor-pointer p-2 m-1 rounded-md ${!isKanban ? "bg-emerald-900 text-white" : "hover:bg-green-50"}`}
            onClick={() => setIsKanban(false)}
          >
            <List className="w-12 h-auto " />
          </button>
          <button
            onClick={() => setIsKanban(true)}
            className={`cursor-pointer p-2 m-1 rounded-md ${isKanban ? "bg-emerald-900 text-white" : "hover:bg-green-50"}`}
          >
            <Kanban className="w-12 h-auto" />
          </button>
        </div>
      </div>

      <TicketFilter
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        assigneeId={assigneeId}
        setAssigneeId={setAssigneeId}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      {isKanban ? (
        <TicketKanban tickets={tickets} />
      ) : (
        <TicketList tickets={tickets} />
      )}
    </div>
  );
}
