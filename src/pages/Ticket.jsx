import { useParams } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import { useState } from "react";

import {
  Tag,
  TriangleAlert,
  Dot,
  UserPlus,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Mail,
  Activity,
  Calendar,
  User,
} from "lucide-react";

export function Ticket() {
  const params = useParams();
  const ticketId = params.ticketId;
  const { tickets } = useTickets();
  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  const [statusDropdown, setStatusDropdown] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [priority, setPriority] = useState(ticket.priority);

  return (
    <div className="bg-lime-50">
      <div className="grid grid-cols-[2fr_1fr] gap-12 justify-self-center w-full">
        <div>
          <div className="ml-20 mt-20 p-6 border bg-white border-emerald-900 rounded-2xl  flex-col flex gap-2">
            <p className="flex gap-4 ml-2 text-xl items-center">
              <span className="p-2 pl-4 pr-4 border-emerald-900 bg-green-100 rounded-md border">
                {ticket.id}
              </span>
              <span>
                {"Opened "}
                {new Date(ticket.createdAt).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            <h1 className="text-4xl font-semibold m-3">{ticket.title}</h1>
            <div className="flex gap-4 text-lg items-center font-semibold m-2">
              <div className="flex  items-center text-center p-2 h-12 pr-8 bg-green-50 rounded-full border border-green-700 text-emerald-900">
                <Dot className="bold stroke-3 w-8 h-auto" />
                {ticket.status}
              </div>
              <div className="flex gap-2 items-center text-center p-2 pl-4 pr-4 h-12 bg-green-50 rounded-full border border-green-700 text-emerald-900">
                <TriangleAlert />
                {ticket.priority}
              </div>
              <div className="flex gap-2 items-center text-center p-2 h-12 pl-4 pr-4 bg-green-50 rounded-full border border-green-700 text-emerald-900">
                <Tag />
                {ticket.category}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 mr-20 mt-20">
          <div className="border bg-white border-emerald-900 rounded-2xl flex flex-col text-lg p-6 gap-6">
            <div>
              <p className="text-xl font-bold">Actions</p>
              <p>manage this ticket</p>
            </div>

            <button className="flex gap-2 w-full bg-green-700 text-white font-semibold rounded-xl cursor-pointer justify-center p-4 text-2xl items-center">
              <UserPlus />
              <p>Assign to me</p>
            </button>
            <label>
              <p className="text-xl font-semibold mb-2">Status</p>
              <button
                onClick={() => setStatusDropdown(!statusDropdown)}
                className="flex items-center bg-green-100 border border-emerald-900 rounded-lg w-full justify-between p-4 cursor-pointer text-2xl font-semibold text-emerald-900 "
              >
                {ticket.status}
                {statusDropdown ? <ChevronUp /> : <ChevronDown />}
              </button>
            </label>
            <label className="">
              <p className="text-xl font-semibold mb-2">Priority </p>
              <button
                onClick={() => setPriorityDropdown(!priorityDropdown)}
                className="flex items-center bg-green-100 border border-emerald-900 rounded-lg w-full justify-between p-4 cursor-pointer text-2xl font-semibold text-emerald-900 "
              >
                {ticket.priority}
                {priorityDropdown ? <ChevronUp /> : <ChevronDown />}
              </button>
            </label>
            <div className="flex gap-4 w-full justify-between">
              <button className="flex items-center gap-2 text-2xl font-semibold w-full bg-green-100 border-emerald-900 pt-4 pb-4 justify-center rounded-xl border text-emerald-900 cursor-pointer hover:bg-green-200">
                <CheckCircle />
                Resolve
              </button>
              <button className="flex items-center gap-2 text-2xl font-semibold w-full bg-orange-100 border-amber-900 border rounded-xl pt-4 pb-4 justify-center text-amber-900 cursor-pointer hover:bg-orange-200">
                <XCircle />
                Close
              </button>
            </div>
          </div>
          <div className="bg-white border flex flex-col text-lg  gap-4 rounded-xl border-emerald-900 w-full p-6">
            <h1 className="font-bold">Ticket Details</h1>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <User />
                <p>Requester</p>
              </div>
              <p className="font-bold">REQUESTER_NAME</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Mail />
                <p>Email</p>
              </div>
              <p className="font-bold"> REQUESTER_EMAIL</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <User />
                <p>Assignee</p>
              </div>
              <p className="font-bold">ASSIGNEE_NAME</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Activity />
                <p>Status</p>
              </div>
              <p className="font-bold">{ticket.status}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <TriangleAlert />
                <p>Priority</p>
              </div>
              <p className="font-bold">{ticket.priority}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Tag />
                <p>Category</p>
              </div>
              <p className="font-bold">{ticket.category}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Calendar />
                <p>Created</p>
              </div>
              <p className="font-bold">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Calendar />
                <p>Updated</p>
              </div>
              <p className="font-bold">
                {new Date(ticket.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
