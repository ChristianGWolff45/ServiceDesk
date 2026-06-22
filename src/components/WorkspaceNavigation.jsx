import {
  TicketCheck,
  TicketX,
  FolderKanban,
  ChevronRight,
  ChevronLeft,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkspaceNavigation() {
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
              className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center `}
              onClick={() => {
                handleSelectedChange("ALL_TICKETS");
                navigate("/Workpage/Board");
              }}
            >
              <FolderKanban />
              All Tickets
            </button>
          </div>
        </div>
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
        </div>
        {/* <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center}
            onClick={() => handleSelectedChange("MY_TICKETS")}
          >
            <TicketCheck />
            My Tickets
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center }
            onClick={() => handleSelectedChange("UNASSIGNED_TICKETS")}
          >
            <TicketX />
            Unassigned Tickets
          </button>
        </div> */}
      </div>
    </div>
  );
}
