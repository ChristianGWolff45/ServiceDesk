import { useEffect } from "react";
import { Header } from "./components/Header";
import { Search } from "lucide-react";
import ticketIcon from "./assets/ticket-add-ticket-add.png";
import { Issue } from "./pages/Issue";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { TicketBoard } from "./components/TicketBoard";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { WorkPage } from "./pages/WorkPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Issue" element={<Issue />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Workpage/*" element={<WorkPage />} />
        <Route path="*" element={<p>404 page not found</p>} />
      </Routes>
    </div>

    // <SignIn />
    // <Issue />
  );
}

export default App;
