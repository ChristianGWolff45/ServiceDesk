import { useParams } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import {
  Tag,
  TriangleAlert,
  Dot,
  UserPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function Ticket() {
  const params = useParams();
  const ticketId = params.ticketId;
  const { tickets } = useTickets();
  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  return (
    <div className="bg-lime-50">
      <div className="grid grid-cols-[2fr_1fr]  justify-self-center w-500">
        <div>
          <div className="m-20 p-6 border bg-white border-emerald-900 rounded-2xl  flex-col flex gap-2">
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
        <div>
          <div className="border bg-white border-emerald-900 m-20 rounded-2xl flex flex-col text-lg p-8">
            <p>Actions</p>
            <p>manage this ticket</p>

            <button className="flex gap-2">
              <UserPlus /> Assign to me
            </button>
            <label>
              <p className="text-xl font-semibold">Status</p>
              <button className="w-full   bg-green-700 text-white rounded-lg p-2">
                {ticket.status}
              </button>
            </label>
            <label>
              Priority
              <button>{ticket.priority}</button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
