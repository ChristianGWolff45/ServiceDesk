import { Sun, Moon, Menu } from "lucide-react";
import { useEffect } from "react";

export function Header() {
  return (
    <div className="flex justify-between items-center text-Neutral-600 font-bold text-2xl p-4 bg-green-800 text-white">
      <div className="flex items-center gap-2">
        <Menu />
        <h1>Presbyterian SeniorCare Help Desk</h1>
      </div>
      <div className="flex gap-8">
        <button className="cursor-pointer">
          <p>Login</p>
        </button>
        <button className="cursor-pointer">
          <p>Sign Up</p>
        </button>
      </div>
    </div>
  );
}
