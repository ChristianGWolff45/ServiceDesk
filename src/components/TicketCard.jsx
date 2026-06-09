import { FoldHorizontal, UserRound } from "lucide-react";
import { useNow } from "../hooks/useNow";
import { timeAgo } from "../utils/timeAgo";
export function TicketCard({
  id,
  title,
  errorMessage,
  description,
  status,
  priority,
  category,
  createdAt,
  updatedAt,
  resolvedAt,
  assigneeId,
  closedAt,
  requesterEmail,
  requesterPhoneNumber,
}) {
  let assigned;
  if (assigneeId === null) {
    assigned = (
      <div className="flex gap-2">
        <UserRound />
        <span>Unassigned</span>
      </div>
    );
  } else {
    assigned = (
      <div className="flex gap-2">
        <UserRound />
        <span>{assigneeId}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm p-2 w-full">
      <p className="pl-2 text-xs">{id}</p>
      <p className="pl-2 font-semibold">{title}</p>
      <p className="pl-2 text-sm">{description}</p>
      <div className="flex gap-4 items-center">
        <p className="ml-2 p-1  text-xs border rounded-md ">{category}</p>
        <p className="p-1  text-xs border rounded-md ">{priority}</p>
      </div>
      <div className="flex justify-between">
        <div className="pl-2">{assigned}</div>
        <p className="pl-2">{timeAgo(useNow(), createdAt)}</p>
      </div>
    </div>
  );
}
