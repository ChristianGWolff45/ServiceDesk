import { TicketBoard } from "../components/TicketBoard";
import { Routes, Route } from "react-router-dom";
import { WorkspaceNavigation } from "../components/WorkspaceNavigation";
import { Header } from "../components/Header";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
export function WorkPage() {
  const [navOpen, setNavOpen] = useState(true);
  return (
    <div className="max-w-screen">
      <Header />
      <div
        className={`grid grid-cols-[1fr_5fr] gap-2  ${navOpen ? "grid-cols-[1fr_5fr]" : "grid-cols-[1fr_160fr]"}`}
      >
        <div
          className="bg-linear-to-b
                from-emerald-900 bg-green-700 min-h-screen rounded-r-md border-green-200 border"
        >
          {navOpen ? (
            <>
              <WorkspaceNavigation />
              <button
                onClick={() => setNavOpen(false)}
                className="absolute left-1/8 top-1/2 cursor-pointer  rounded-full opacity-0 hover:opacity-100"
              >
                <ChevronLeft className="hover:text-white p-4 hover:block w-32 h-auto" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setNavOpen(true)}
              className="absolute left-0 top-1/2 cursor-pointer rounded-full opacity-0 hover:opacity-100"
            >
              <ChevronRight className="hover:text-emerald-900 hover:block w-24 h-auto" />
            </button>
          )}
        </div>
        <Routes>
          <Route path="Board" element={<TicketBoard />} />
        </Routes>
      </div>
    </div>
  );
}
