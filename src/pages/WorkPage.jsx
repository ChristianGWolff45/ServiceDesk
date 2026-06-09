import { TicketBoard } from "../components/TicketBoard";
import { Routes, Route } from "react-router-dom";
import { WorkspaceNavigation } from "../components/WorkspaceNavigation";
import { Header } from "../components/Header";

export function WorkPage() {
  return (
    <div className="max-w-screen">
      <Header />
      <div className="grid grid-cols-[1fr_5fr] gap-2  ">
        <div className="  bg-green-700 rounded-r-md border-green-200 border">
          <WorkspaceNavigation />
        </div>
        <Routes>
          <Route path="Board" element={<TicketBoard />} />
        </Routes>
      </div>
    </div>
  );
}
