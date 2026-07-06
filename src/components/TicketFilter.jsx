import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useUser } from "../hooks/useUser";
import { useCategories } from "../hooks/useCategories";
import { useSupportStaff } from "../hooks/useSupportStaff";

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
  const { user: assignee, setUserId } = useUser();
  const { loading: categoriesLoading, categories } = useCategories();

  const { loading: usersLoading, users, getUserById } = useUsers();
  const { loading: agentsLoading, agents } = useSupportStaff();

  function closeDropdowns() {
    setStatusDropdown(false);
    setPriorityDropdown(false);
    setAssigneeIdDropdown(false);
    setCategoryDropdown(false);
  }
  useEffect(() => {
    if (
      statusDropdown ||
      priorityDropdown ||
      assigneeIdDropdown ||
      categoryDropdown
    ) {
      document.addEventListener("click", closeDropdowns);
      return () => {
        document.removeEventListener("click", closeDropdowns);
      };
    }
  }, [
    statusDropdown ||
      priorityDropdown ||
      assigneeIdDropdown ||
      categoryDropdown,
  ]);
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
          onClick={(e) => {
            e.stopPropagation();
            setStatusDropdown(!statusDropdown);
          }}
          className=" p-2 rounded-md border cursor-pointer flex w-full justify-between"
        >
          <p>
            Status:{" "}
            <span className="font-semibold">
              {status ? status : "All Tickets"}
            </span>
          </p>
          {!statusDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {statusDropdown && (
          <div className="flex border border-emerald-900  flex-col items-start absolute mt-16 w-full  rounded-md text-2xl  bg-white p-1">
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md  ${status === null ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus(null)}
            >
              All Tickets
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md  ${status === "OPEN" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus("OPEN")}
            >
              Open
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md  ${status === "IN_PROGRESS" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus("IN_PROGRESS")}
            >
              In Progress
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md  ${status === "WAITING_ON_USER" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus("WAITING_ON_USER")}
            >
              Waiting on User
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${status === "RESOLVED" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus("RESOLVED")}
            >
              Resolved
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${status === "CLOSED" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setStatus("CLOSED")}
            >
              Closed
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPriorityDropdown(!priorityDropdown);
          }}
          className="p-2 cursor-pointer rounded-md border flex w-full justify-between"
        >
          <p>
            Priority:{" "}
            <span className="font-semibold">
              {priority ? priority : "All Priority"}
            </span>
          </p>
          {!priorityDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {priorityDropdown && (
          <div className="flex border border-emerald-900  flex-col items-start absolute mt-16 w-full  rounded-md text-2xl  bg-white p-1">
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${priority === null ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => {
                setPriority(null);
              }}
            >
              All Priority
            </button>

            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${priority === "HIGH" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => {
                setPriority("HIGH");
              }}
            >
              HIGH
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${status === "MEDIUM" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setPriority("MEDIUM")}
            >
              MEDIUM
            </button>
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${status === "LOW" ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setPriority("LOW")}
            >
              LOW
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAssigneeIdDropdown(!assigneeIdDropdown);
          }}
          className="p-2 rounded-md border cursor-pointer flex w-full justify-between"
        >
          <p>
            Assignee:{" "}
            <span className="font-semibold">
              {assignee
                ? `${assignee.first_name} ${assignee.last_name}`
                : "All Users"}
            </span>
          </p>
          {!assigneeIdDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {assigneeIdDropdown && (
          <div className="flex border border-emerald-900  flex-col items-start absolute mt-16 w-full  rounded-md text-2xl  bg-white p-1">
            {agentsLoading ? (
              <p>Loading agents</p>
            ) : (
              <div>
                <button
                  className={`cursor-pointer p-2 w-full text-left rounded-md ${assignee === null ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
                  onClick={() => {
                    setUserId(null);
                    setAssigneeId(null);
                  }}
                >
                  All Users
                </button>
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    className={`cursor-pointer p-2 w-full text-left rounded-md ${assignee !== null && assignee.id === agent.id ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
                    onClick={() => {
                      setUserId(agent.id);
                      setAssigneeId(agent.id);
                    }}
                  >
                    {agent.first_name + " " + agent.last_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col relative items-start ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCategoryDropdown(!categoryDropdown);
          }}
          className="p-2 rounded-md border flex w-full cursor-pointer justify-between"
        >
          <p>
            Category:{" "}
            <span className="font-semibold">
              {category ? category : "All Category"}
            </span>
          </p>
          {!categoryDropdown ? <ChevronDown /> : <ChevronUp />}
        </button>
        {categoryDropdown && (
          <div className="flex border border-emerald-900  flex-col items-start absolute mt-16 w-full  rounded-md text-2xl  bg-white p-1">
            <button
              className={`cursor-pointer p-2 w-full text-left rounded-md ${null === category ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
              onClick={() => setCategory(null)}
            >
              All Category
            </button>
            {categories.map((categoryOption) => (
              <button
                className={`cursor-pointer p-2 w-full text-left rounded-md ${categoryOption.category === category ? "bg-emerald-100" : "hover:bg-emerald-50"}`}
                key={categoryOption.id}
                onClick={() => setCategory(categoryOption.category)}
              >
                {categoryOption.category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
