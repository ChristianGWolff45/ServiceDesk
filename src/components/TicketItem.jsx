import { useNavigate } from "react-router-dom";

export function TicketItem({ ticket }) {
  const navigate = useNavigate();
  return (
    <div
      className="grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] grid bg-green-50 p-4 border-t rounded-b-lg border-emerald-900 cursor-pointer hover:bg-green-100 hover:p-4 hover:text-2xl"
      onClick={() => navigate(`tickets/${ticket.id}`)}
    >
      <p className="font-semibold ">{ticket.id}</p>
      <p className="font-semibold ">{ticket.title}</p>
      <p className="font-semibold ">{ticket.status}</p>
      <p className="font-semibold ">{ticket.priority}</p>
      <p className="font-semibold ">{ticket.assigneeId}</p>
      <p className="font-semibold ">N/A</p>
    </div>
  );
}
