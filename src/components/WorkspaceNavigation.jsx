import { TicketCheck, TicketX, FolderKanban } from "lucide-react";
import { useState } from "react";

export function WorkspaceNavigation() {
  const [select, setSelected] = useState("All Tickets");
  const handleSelectedChange = (selected) => {
    setSelected(selected);
  };
  return (
    <div>
      <div className="flex flex-col justify-start items-start p-4">
        <p className="p-1">Tickets</p>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer ${select === "ALL_TICKETS" ? "bg-green-100 " : ""} hover:bg-green-50`}
            onClick={() => handleSelectedChange("ALL_TICKETS")}
          >
            <FolderKanban />
            All Tickets
          </button>
        </div>
        <div>
          {" "}
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer hover:bg-green-50 ${select === "MY_TICKETS" ? "bg-green-100" : ""}`}
            onClick={() => handleSelectedChange("MY_TICKETS")}
          >
            <TicketCheck />
            My Tickets
          </button>
        </div>
        <div>
          <button
            className={`flex gap-2 p-1 rounded-sm cursor-pointer hover:bg-green-50 ${select === "UNASSIGNED_TICKETS" ? "bg-green-100" : ""}`}
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
