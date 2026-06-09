import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export function TicketFilter({
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
}) {
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [assigneeIdDropdown, setAssigneeIdDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  return (
    <div className="ml-20 mr-20 text-xl mt-12 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4">
      <div className="border rounded-md flex gap-2 items-center">
        <Search className="ml-2" />
        <input
          className=" focus:outline-none p-2 w-full"
          placeholder="Search by ID, title, requester... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={() => setStatusDropdown(!statusDropdown)}
          className="p-2 rounded-md border flex w-full justify-between"
        >
          <p>
            Status: <span className="font-semibold">{status}</span>
          </p>
          {!statusDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {statusDropdown && (
          <div className="flex flex-col items-start absolute mt-16 w-full  rounded-md text-2xl gap-2 bg-sky-600 p-2 text-white">
            <button onClick={() => setStatus("ALL_TICKETS")}>
              All Tickets
            </button>
            <button onClick={() => setStatus("OPEN")}>Open</button>
            <button onClick={() => setStatus("IN_PROGRESS")}>
              In Progress
            </button>
            <button onClick={() => setStatus("WAITING_ON_USER")}>
              Waiting on User
            </button>
            <button onClick={() => setStatus("RESOLVED")}>Resolved</button>
            <button onClick={() => setStatus("CLOSED")}>Closed</button>
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={() => setPriorityDropdown(!priorityDropdown)}
          className="p-2 rounded-md border flex w-full justify-between"
        >
          <p>
            Priority: <span className="font-semibold">{priority}</span>
          </p>
          {!priorityDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {priorityDropdown && (
          <div className="flex flex-col items-start absolute mt-16 w-full  rounded-md text-2xl gap-2 bg-sky-600 p-2 text-white">
            <button onClick={() => setPriority("HIGH")}>HIGH</button>
            <button onClick={() => setPriority("MEDIUM")}>MEDIUM</button>
            <button onClick={() => setPriority("LOW")}>LOW</button>
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={() => setAssigneeIdDropdown(!assigneeIdDropdown)}
          className="p-2 rounded-md border flex w-full justify-between"
        >
          <p>
            Assignee: <span className="font-semibold">{assigneeId}</span>
          </p>
          {!assigneeIdDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {assigneeIdDropdown && (
          <div className="flex flex-col items-start absolute mt-16 w-full  rounded-md text-2xl gap-2 bg-sky-600 p-2 text-white">
            <button onClick={() => setAssigneeId("agent_1")}>AGENT_1</button>
            <button onClick={() => setAssigneeId("agent_2")}>AGENT_2</button>
            <button onClick={() => setAssigneeId("agent_3")}>AGENT_3</button>
            <button onClick={() => setAssigneeId("agent_4")}>AGENT_4</button>
            <button onClick={() => setAssigneeId("agent_5")}>AGENT_5</button>
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={() => setCategoryDropdown(!categoryDropdown)}
          className="p-2 rounded-md border flex w-full justify-between"
        >
          <p>
            Category: <span className="font-semibold">{category}</span>
          </p>
          {!statusDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {categoryDropdown && (
          <div className="flex flex-col items-start absolute mt-16 w-full  rounded-md text-2xl gap-2 bg-sky-600 p-2 text-white">
            <button onClick={() => setCategory("Network Connection")}>
              Network Connection
            </button>
            <button onClick={() => setCategory("Account Access")}>
              Account Access
            </button>
            <button onClick={() => setCategory("General Question")}>
              General Question
            </button>
            <button onClick={() => setCategory("Website Bug")}>
              Website Bug
            </button>
            <button onClick={() => setCategory("Deployment Issue")}>
              Deployment Issue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
