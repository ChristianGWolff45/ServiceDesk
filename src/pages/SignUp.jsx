import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Header } from "../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export function SignUp() {
  const { registerNewUser, actionSuccess } = useAuth();
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setAccount((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  }
  const [Account, setAccount] = useState({
    Email: "",
    Password: "",
    PhoneNumber: "",
    ConfirmPassword: "",
    FirstName: "",
    LastName: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Account.ConfirmPassword !== Account.Password) {
      return alert("Passwords do no match");
    }
    registerNewUser({
      firstName: Account.FirstName,
      lastName: Account.LastName,
      email: Account.Email,
      phoneNumber: Account.PhoneNumber,
      password: Account.Password,
    });
    if (actionSuccess) {
      navigate("/SignIn");
    }
  };
  return (
    <>
      <div className="bg-emerald-700 min-h-screen items-center flex justify-center">
        <form className="bg-white rounded-lg self-center p-8 w-150 flex flex-col gap-8">
          <h1 className="font-bold text-2xl self-center border-b border-green-800 p-2 pl-16 pr-16">
            Create Account Below
          </h1>
          <label className="flex flex-col text-xl font-semibold">
            First Name
            <div className="border-l border-b border-green-800 p-2 m-2 flex">
              <input
                placeholder="First Name"
                name="FirstName"
                value={Account.FirstName}
                onChange={handleChange}
                className="ml-2 focus:outline-none"
              ></input>
            </div>
          </label>
          <label className="flex flex-col text-xl font-semibold">
            Last Name
            <div className="border-l border-b border-green-800 p-2 m-2 flex">
              <input
                placeholder="Last Name"
                name="LastName"
                value={Account.LastName}
                onChange={handleChange}
                className="ml-2 focus:outline-none"
              ></input>
            </div>
          </label>
          <label className="flex flex-col text-xl font-semibold">
            Email
            <div className="border-l border-b border-green-800 p-2 m-2 flex">
              <input
                placeholder="Enter Email Here"
                name="Email"
                value={Account.Email}
                onChange={handleChange}
                className="ml-2 focus:outline-none"
              ></input>
            </div>
          </label>

          <label className="flex flex-col text-xl font-semibold">
            Phone Number
            <div className="border-l border-b border-green-800 p-2 m-2 flex">
              <input
                placeholder="Enter Phone Number Here"
                name="PhoneNumber"
                value={Account.PhoneNumber}
                onChange={handleChange}
                className="ml-2 focus:outline-none"
              ></input>
            </div>
          </label>

          <label className="flex flex-col text-xl font-semibold">
            Password
            <div className="border-l border-b border-green-800  p-2 m-2 flex ">
              <input
                placeholder="Password"
                name="Password"
                value={Account.Password}
                onChange={handleChange}
                className="ml-2 focus:outline-none w-full"
                type="password"
              ></input>
            </div>
          </label>

          <label className="flex flex-col text-xl font-semibold">
            Confirm Password
            <div className="border-l border-b border-green-800  p-2 m-2 flex ">
              <input
                placeholder="Confirm Password"
                name="ConfirmPassword"
                value={Account.ConfirmPassword}
                onChange={handleChange}
                className="ml-2 focus:outline-none w-full"
                type="password"
              ></input>
            </div>
          </label>
          <button
            className="rounded-full p-2 m-auto mt-8 pl-16 pr-16 bg-green-800 cursor-pointer drop-shadow-2xl text-white font-semibold text-2xl"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
