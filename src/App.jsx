import { useEffect } from "react";
import { Header } from "./components/Header";
import { Search } from "lucide-react";
import ticketIcon from "./assets/ticket-add-ticket-add.png";
import { Issue } from "./components/Issue";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { TicketBoard } from "./components/TicketBoard";

function App() {
  return (
    <TicketBoard />

    // <SignIn />
    // <Issue />

    //   <div className="min-h-screen bg-gray-100 text-black">
    //     <div className="bg-green-800 pb-20 text-white font-semibold">
    //       <Header />
    //       <h1 className="text-4xl font-bold pt-16 pb-6 flex justify-center">
    //         Hi, how can we help you?
    //       </h1>
    //       <div className="m-auto mt-4 mb-8 flex w-3/4 gap-4 rounded-lg bg-white p-4 shadow-lg dark:text-gray-700">
    //         <Search />
    //         <input
    //           type="text"
    //           placeholder="Search for solutions, services, and tickets"
    //           className="w-full text-gray-700 outline-none focus:outline-none"
    //         />
    //       </div>
    //     </div>
    //     <button className="flex text-left items-center w-120 m-auto p-8 mt-16 bg-white rounded-lg drop-shadow-2xl cursor-pointer hover:bg-gray-50">
    //       <img src={ticketIcon} alt="ticket" className="w-32" />
    //       <div>
    //         <h1 className="font-semibold text-xl mb-2">Open a Ticket</h1>
    //         <h2>Having trouble? Contact the support team</h2>
    //       </div>
    //     </button>
    //   </div>
  );
}

export default App;
