import {
  TicketCheck,
  TicketX,
  FolderKanban,
  ChevronRight,
  ChevronLeft,
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
    <div className="h-full">
      <div className="flex flex-col justify-start items-start  p-4  text-white text-2xl">
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
