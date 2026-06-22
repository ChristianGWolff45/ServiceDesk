import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function AddUser() {
  const [roleDropdown, setRoleDropdown] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "REQUESTER",
  });
  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <form className="bg-white rounded-xl p-6 flex flex-col gap-4">
      <div>
        <h1 className="font-bold">Add user</h1>
        <p className="font-light">Create a new account and assign access</p>
      </div>
      <div className="flex gap-4">
        <label>
          <p>First name</p>
          <input
            value={values.firstName}
            onChange={(e) => handleChange(e.target.value, firstName)}
            className="border border-emerald-900 rounded-md p-2"
          ></input>
        </label>
        <label>
          <p>Last name</p>
          <input
            value={values.lastName}
            onChange={(e) => handleChange(e.target.value, lastName)}
            className="border border-emerald-900 rounded-md p-2"
          ></input>
        </label>
      </div>
      <label>
        <p>Email</p>
        <input
          value={values.email}
          onChange={(e) => handleChange(e.target.value, email)}
          className="border border-emerald-900 rounded-md p-2 w-full"
        ></input>
      </label>

      <label>
        <p>Phone</p>
        <input
          value={values.phoneNumber}
          onChange={(e) => handleChange(e.target.value, phoneNumber)}
          className="border border-emerald-900 rounded-md p-2 w-full"
        ></input>
      </label>
      <div>
        <label>
          <p>Role</p>
          <button
            onClick={() => setRoleDropdown(!roleDropdown)}
            type="button"
            className="flex cursor-pointer justify-between items-center rounded-md border-emerald-900 border p-1 pl-2 pr-2 w-full"
          >
            <p>{values.role}</p>
            {roleDropdown ? <ChevronUp /> : <ChevronDown />}
          </button>
        </label>
      </div>
      <div className="flex justify-end w-full gap-4 items-center">
        <button className="pl-4 pr-4 p-2 border rounded-lg cursor-pointer text-amber-900 border-amber-900">
          Cancel
        </button>
        <button className="pl-4 pr-4 p-2 border rounded-lg cursor-pointer text-white bg-emerald-900 border-emerald-900">
          Create User
        </button>
      </div>
    </form>
  );
}
