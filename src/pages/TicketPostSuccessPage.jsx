import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TicketPostSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex">
      <div className="self-center m-auto border border-emerald-900 rounded-2xl p-8 flex flex-col gap-6">
        <CheckCircle className="text-green-700 h-20 w-auto m-auto p-2 bg-green-200 rounded-full " />
        <div>
          <h1 className="font-semibold text-2xl">
            You Ticket has been submitted Succefully
          </h1>
          <p className="font-light text-xl">
            our support team will review your ticket and follow up soon
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-emerald-900 border cursor-pointer border-emerald-900 rounded-lg text-white text-xl"
          >
            Return Home
          </button>
          <button
            onClick={() => navigate("/Issue")}
            className="p-2 border bg-orange-200 border-amber-900 rounded-lg text-xl text-amber-900 cursor-pointer"
          >
            Submit Another Ticket
          </button>

          <button
            onClick={() => navigate("/WorkPage/MyTickets")}
            className="p-2 border bg-green-200 border-emerald-900 rounded-lg text-xl text-emerald-900 cursor-pointer"
          >
            Review Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
