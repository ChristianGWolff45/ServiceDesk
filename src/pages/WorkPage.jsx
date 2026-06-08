import { TicketBoard } from "../components/TicketBoard";
import { Routes, Route } from "react-router-dom";
export function WorkPage() {
  return (
    <div>
      <Routes>
        <Route path="/Board" element={<TicketBoard />} />
      </Routes>
    </div>
  );
}
