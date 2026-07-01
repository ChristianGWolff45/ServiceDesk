import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { login: userLogin } = useAuth();
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  }
  const [login, setLogin] = useState({
    Email: "",
    Password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const success = await userLogin({
      email: login.Email,
      password: login.Password,
    });
    if (success) {
      navigate("/Workpage/MyTicketsPage");
    }
  }
  return (
    <>
      <div className="bg-emerald-700 min-h-screen items-center flex justify-center">
        <form className="bg-white rounded-lg self-center p-8 w-150 flex flex-col gap-8">
          <h1 className="font-bold text-2xl self-center border-b border-green-800 p-2 pl-16 pr-16">
            Enter Login Credentials below
          </h1>
          <label className="flex flex-col text-xl font-semibold">
            Email
            <div className="border-l border-b border-green-800 p-2 m-2 flex">
              <Mail />
              <input
                placeholder="Enter Email Here"
                name="Email"
                value={login.Email}
                onChange={handleChange}
                className="ml-2 focus:outline-none"
              ></input>
            </div>
          </label>

          <label className="flex flex-col text-xl font-semibold">
            Password
            <div className="border-l border-b border-green-800  p-2 m-2 flex ">
              <Lock />
              <input
                placeholder="Password"
                name="Password"
                value={login.Password}
                onChange={handleChange}
                className="ml-2 focus:outline-none w-full"
                type="password"
              ></input>
            </div>
            <button
              className="rounded-full p-2 m-auto mt-8 pl-16 pr-16 bg-green-800 cursor-pointer drop-shadow-2xl text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </label>
        </form>
      </div>
    </>
  );
}
