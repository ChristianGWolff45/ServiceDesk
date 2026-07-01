import { TicketItem } from "./TicketItem";

export function TicketList({ tickets }) {
  return (
    <div className="border-l border-r border-b border-emerald-900 rounded-lg m-24">
      <div className="grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] grid p-4 bg-emerald-900 rounded-t-lg p-">
        <p className="font-semibold text-white">TICKET</p>
        <p className="font-semibold text-white">STATUS</p>
        <p className="font-semibold text-white">PRIORITY</p>
        <p className="font-semibold text-white">CREATED</p>
        <p className="font-semibold text-white">UPDATED</p>
        <p className="font-semibold text-white">ASSIGNEE</p>
      </div>
      <div className="flex flex-col">
        {tickets.map((ticket) => {
          return <TicketItem key={ticket.id} ticket={ticket} />;
        })}
      </div>
    </div>
  );
}
