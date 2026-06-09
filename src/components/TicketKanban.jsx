import { useTickets } from "../hooks/useTickets";

import { TicketCard } from "./TicketCard";
export function TicketKanban({ tickets }) {
  return (
    <div className="bg-linear-to-b from-emerald-900 to-green-700 grid m-16 p-8 rounded-2xl gap-4 grid-cols-[1fr_1fr_1fr_1fr_1fr] overflow-x-scroll">
      <div className="bg-green-100 p-4 flex flex-col gap-4 h-fit mt-16 rounded-xl w-full">
        <div className="flex justify-between items-center ">
          <h1>Open</h1>
          <span className="bg-white  rounded-full w-6 h-6 text-center">
            {tickets.filter((ticket) => ticket.status === "OPEN").length}
          </span>
        </div>
        {tickets
          .filter((ticket) => ticket.status === "OPEN")
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
      </div>

      <div className="bg-green-100 p-4 flex flex-col gap-4 h-fit mt-16 rounded-xl w-full">
        <div className="flex justify-between items-center ">
          <h1>In Progress</h1>
          <span className="bg-white  rounded-full w-6 h-6 text-center">
            {tickets.filter((ticket) => ticket.status === "IN_PROGRESS").length}
          </span>
        </div>
        {tickets
          .filter((ticket) => ticket.status === "IN_PROGRESS")
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
      </div>

      <div className="bg-green-100 p-4 flex flex-col gap-4 h-fit mt-16 rounded-xl w-full">
        <div className="flex justify-between items-center ">
          <h1>Waiting on User</h1>
          <span className="bg-white  rounded-full w-6 h-6 text-center">
            {
              tickets.filter((ticket) => ticket.status === "WAITING_ON_USER")
                .length
            }
          </span>
        </div>
        {tickets
          .filter((ticket) => ticket.status === "WAITING_ON_USER")
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
      </div>

      <div className="bg-green-100 p-4 flex flex-col gap-4 h-fit mt-16 rounded-xl w-full">
        <div className="flex justify-between items-center ">
          <h1>Resolved</h1>
          <span className="bg-white  rounded-full w-6 h-6 text-center">
            {tickets.filter((ticket) => ticket.status === "RESOLVED").length}
          </span>
        </div>
        {tickets
          .filter((ticket) => ticket.status === "RESOLVED")
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
      </div>

      <div className="bg-green-100 p-4 flex flex-col gap-4 h-fit mt-16 rounded-xl w-full">
        <div className="flex justify-between items-center ">
          <h1>Closed</h1>
          <span className="bg-white  rounded-full w-6 h-6 text-center">
            {tickets.filter((ticket) => ticket.status === "CLOSED").length}
          </span>
        </div>
        {tickets
          .filter((ticket) => ticket.status === "CLOSED")
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
      </div>
    </div>
  );
}
