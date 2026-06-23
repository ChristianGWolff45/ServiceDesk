import { TicketBoard } from "../components/TicketBoard";
import { Routes, Route } from "react-router-dom";
import { WorkspaceNavigation } from "../components/WorkspaceNavigation";
import { Header } from "../components/Header";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Ticket } from "./Ticket";
import { AdminUsers } from "../components/AdminUsers";
import { TicketOptions } from "../components/TicketOptions";
export function WorkPage() {
  const [navOpen, setNavOpen] = useState(true);
  return (
    <div className="max-w-screen h-full">
      <div
        className={`grid grid-cols-[1fr_5fr]  ${navOpen ? "grid-cols-[1fr_5fr]" : "grid-cols-[1fr_160fr]"}`}
      >
        <div
          className="bg-linear-to-b
                from-emerald-900 bg-green-700 min-h-screen h-full rounded-r-md border-green-200 border"
        >
          {navOpen ? (
            <div className="flex">
              <WorkspaceNavigation />
              <button
                onClick={() => setNavOpen(false)}
                className="absolute left-1/6 -translate-x-32 cursor-pointer rounded-full opacity-0 hover:opacity-100 h-full"
              >
                <ChevronLeft className="text-white  w-32 h-auto" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setNavOpen(true)}
              className="absolute left-0 cursor-pointer rounded-full opacity-0 hover:opacity-100 h-full"
            >
              <ChevronRight className="text-emerald-900 w-24 h-auto" />
            </button>
          )}
        </div>
        <Routes>
          <Route path="Board" element={<TicketBoard />} />
          <Route path="Board/tickets/:ticketId" element={<Ticket />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/ticketOptions" element={<TicketOptions />} />
        </Routes>
      </div>
    </div>
  );
}
