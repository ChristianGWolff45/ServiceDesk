import {
  TicketCheck,
  TicketX,
  FolderKanban,
  ChevronRight,
  ChevronLeft,
  Ticket,
  Users,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
export function WorkspaceNavigation() {
  const { user, token } = useAuthContext();
  const navigate = useNavigate();
  const [select, setSelected] = useState("All Tickets");
  const handleSelectedChange = (selected) => {
    setSelected(selected);
  };
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-start items-start gap-x-44 w-full p-4  text-white text-2xl">
        <div className="border-b border-white w-full">
          <p className="p-1">Tickets</p>
          <div>
            <button
              className="flex items-start gap-2 pt-2 pb-2 cursor-pointer"
              onClick={() => {
                handleSelectedChange("ALL_TICKETS");
                navigate("/Workpage/MyTicketsPage");
              }}
            >
              <Ticket className="w-8 h-auto" />
              <div className="text-start">
                <h1>My Tickets</h1>
                <p className="text-sm">View all tickets created by you</p>
              </div>
            </button>
            {(user.role === "ADMIN" || user.role === "AGENT") && (
              <button
                className="flex items-start gap-2 pt-2 pb-2 cursor-pointer"
                onClick={() => {
                  handleSelectedChange("ALL_TICKETS");
                  navigate("/Workpage/Board");
                }}
              >
                <FolderKanban className="w-8 h-auto" />
                <div className="text-start">
                  <h1>All Tickets</h1>
                  <p className="text-sm">View all active tickets</p>
                </div>
              </button>
            )}
          </div>
        </div>
        {user.role === "ADMIN" && (
          <div>
            <p className="p-1">Admin</p>
            <button
              className="flex items-start gap-2 pt-2 pb-2 cursor-pointer"
              onClick={() => navigate("/Workpage/admin/users")}
            >
              <Users className="w-8 h-auto" />
              <div className="text-start">
                <h1>User Management</h1>
                <p className="text-sm">Roles, status, and access</p>
              </div>
            </button>

            <button
              className="flex items-start gap-2 pt-2 pb-2 cursor-pointer"
              onClick={() => navigate("/Workpage/admin/ticketAdmin")}
            >
              <Tag className="w-8 h-auto" />
              <div className="text-start">
                <h1>Ticket Options</h1>
                <p className="text-sm">Update categories and locations</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
