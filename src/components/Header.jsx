import { Sun, Moon, Menu } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center text-Neutral-600 font-bold text-2xl p-4 bg-green-800 text-white">
      <div className="flex items-center gap-2">
        <Menu className="cursor-pointer hover:text-green-100" />
        <button
          className="cursor-pointer hover:text-green-100"
          onClick={() => navigate("/")}
        >
          Presbyterian SeniorCare Help Desk
        </button>
      </div>
      <div className="flex gap-8">
        <button
          className="cursor-pointer hover:text-green-100"
          onClick={() => navigate("/SignIn")}
        >
          <p>Login</p>
        </button>
        <button
          className="cursor-pointer hover:text-green-100"
          onClick={() => navigate("/SignUp")}
        >
          <p>Sign Up</p>
        </button>
      </div>
    </div>
  );
}
