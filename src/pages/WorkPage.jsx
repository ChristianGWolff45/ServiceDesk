import { TicketBoard } from "../components/TicketBoard";
import { Routes, Route } from "react-router-dom";
import { WorkspaceNavigation } from "../components/WorkspaceNavigation";
import { Header } from "../components/Header";
export function WorkPage() {
  return (
    <div>
      <Header />
      <div className="flex gap-2">
        <div className="w-1/5">
          <WorkspaceNavigation />
        </div>
        <Routes>
          <Route path="/Board" element={<TicketBoard />} />
        </Routes>
      </div>
    </div>
  );
}
