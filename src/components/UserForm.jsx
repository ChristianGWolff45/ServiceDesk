import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { validateUser } from "../utils/validateUser";
import { useUser } from "../hooks/useUser";

export function UserForm({ onClose, onSubmit, action, user }) {
  const [roleDropdown, setRoleDropdown] = useState(false);

  const [values, setValues] = useState({
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phone_number ?? "",
    role: user?.role ?? "REQUESTER",
    userId: user?.id ?? "",
  });

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validateUser(values);
    if (Object.keys(errors).length !== 0) {
      return alert(
        Object.entries(errors).map((error) => {
          return `${error}\n`;
        }),
      );
    }
    onSubmit(values);

    onClose(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 flex flex-col gap-4"
    >
      <div>
        <h1 className="font-bold">User Form</h1>
        <p className="font-light">Create/Update account and assign access</p>
      </div>
      <div className="flex gap-4">
        <label>
          <p>First name</p>
          <input
            value={values.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="border border-emerald-900 rounded-md p-2"
          ></input>
        </label>
        <label>
          <p>Last name</p>
          <input
            value={values.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="border border-emerald-900 rounded-md p-2"
          ></input>
        </label>
      </div>
      <label>
        <p>Email</p>
        <input
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border border-emerald-900 rounded-md p-2 w-full"
        ></input>
      </label>

      <label>
        <p>Phone</p>
        <input
          value={values.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          className="border border-emerald-900 rounded-md p-2 w-full"
        ></input>
      </label>
      <div>
        <label>
          <p>Role</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRoleDropdown(!roleDropdown);
            }}
            type="button"
            className="flex cursor-pointer justify-between items-center rounded-md border-emerald-900 border p-1 pl-2 pr-2 w-full"
          >
            <p>{values.role}</p>
            {roleDropdown ? <ChevronUp /> : <ChevronDown />}
          </button>
        </label>
        {roleDropdown && (
          <div className="flex flex-col p-1 items-start mt-2 rounded-lg border border-emerald-900">
            <button
              type="button"
              onClick={() => {
                setRoleDropdown(false);
                handleChange("role", "REQUESTER");
              }}
              className="p-2 hover:bg-sky-200 cursor-pointer rounded-lg w-full text-left"
            >
              REQUESTER
            </button>
            <button
              type="button"
              onClick={() => {
                setRoleDropdown(false);
                handleChange("role", "AGENT");
              }}
              className="p-2 hover:bg-sky-200  cursor-pointer rounded-lg w-full text-left"
            >
              AGENT
            </button>
            <button
              type="button"
              onClick={() => {
                setRoleDropdown(false);
                handleChange("role", "ADMIN");
              }}
              className="p-2 hover:bg-sky-200 cursor-pointer rounded-lg w-full text-left"
            >
              ADMIN
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full gap-4 items-center">
        <button
          type="button"
          className="pl-4 pr-4 p-2 border rounded-lg cursor-pointer text-amber-900 border-amber-900"
          onClick={() => {
            onClose(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="pl-4 pr-4 p-2 border rounded-lg cursor-pointer text-white bg-emerald-900 border-emerald-900"
        >
          {`${action} User`}
        </button>
      </div>
    </form>
  );
}
