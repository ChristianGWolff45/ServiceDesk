import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export function TicketItem({ ticket }) {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { user: assignee, setUserId, userLoading } = useUser(token);

  useEffect(() => {
    setUserId(ticket.assignee_id);
  }, [ticket]);

  if (userLoading) {
    return <p>Loading</p>;
  }
  return (
    <div
      className="items-center grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] grid bg-green-50 p-4 border-t rounded-b-lg border-emerald-900 cursor-pointer hover:bg-green-100 hover:p-4 hover:text-2xl"
      onClick={() => navigate(`/workpage/tickets/${ticket.id}`)}
    >
      <div>
        <p className="font-semibold text-xl ">{ticket.title}</p>
        <div className="flex gap-4">
          <p className="font-light ">{`TCK-${ticket.id}`}</p>
          <p className="font-light ">{`-`}</p>
          <p className="font-light ">{`${ticket.category}`}</p>
        </div>
      </div>

      <p className="font-semibold ">{ticket.status}</p>
      <p className="font-semibold ">{ticket.priority}</p>

      <p className="font-semibold ">
        {new Date(ticket.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="font-semibold ">
        {new Date(ticket.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="font-semibold ">
        {assignee ? assignee.firstName + " " + assignee.lastName : "UNASSIGNED"}
      </p>
    </div>
  );
}
