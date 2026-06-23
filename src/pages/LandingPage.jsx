import { TicketIcon } from "lucide-react";
import { Header } from "../components/Header";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="bg-green-800 pb-20 text-white font-semibold">
        <h1 className="text-4xl font-bold pt-16 pb-6 flex justify-center">
          Hi, how can we help you?
        </h1>
        <div className="m-auto mt-4 mb-8 flex w-3/4 gap-4 rounded-lg bg-white p-4 shadow-lg text-gray-700">
          <Search />
          <input
            type="text"
            placeholder="Search for solutions, services, and tickets"
            className="w-full text-gray-700 outline-none focus:outline-none"
          />
        </div>
      </div>
      <button
        className="flex text-left items-center gap-4 w-120 m-auto p-8 mt-16 bg-white rounded-lg drop-shadow-2xl cursor-pointer hover:bg-gray-50 hover:mt-14"
        onClick={() => navigate("/Issue")}
      >
        {/* <img src={ticketIcon} alt="ticket" className="w-32" /> */}
        <TicketIcon className="w-16 h-auto" />
        <div>
          <h1 className="font-semibold text-xl mb-2">Open a Ticket</h1>
          <h2>Having trouble? Contact the support team</h2>
        </div>
      </button>
    </div>
  );
}
