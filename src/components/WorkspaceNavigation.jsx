import {
  TicketCheck,
  TicketX,
  FolderKanban,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

export function WorkspaceNavigation() {
  const [select, setSelected] = useState("All Tickets");
  const handleSelectedChange = (selected) => {
    setSelected(selected);
  };
  return (
    <div className="h-full">
      <div className="flex flex-col justify-start items-start h-full p-4 bg-gradient-to-b from-emerald-950 to-green-700 h-screen text-white text-2xl">
        <p className="p-1">Tickets</p>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center ${select === "ALL_TICKETS" ? "bg-sky-600" : "hover:bg-sky-500"}`}
            onClick={() => handleSelectedChange("ALL_TICKETS")}
          >
            <FolderKanban />
            All Tickets
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center ${select === "MY_TICKETS" ? "bg-sky-600" : "hover:bg-sky-500"}`}
            onClick={() => handleSelectedChange("MY_TICKETS")}
          >
            <TicketCheck />
            My Tickets
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer items-center  ${select === "UNASSIGNED_TICKETS" ? "bg-sky-600" : "hover:bg-sky-500"}`}
            onClick={() => handleSelectedChange("UNASSIGNED_TICKETS")}
          >
            <TicketX />
            Unassigned Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
