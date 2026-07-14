import { useEffect, useState } from "react";
import { X } from "lucide-react";
export function ResetPassword({
  exit,
  user,
  submit,
  temporaryPassword,
  setTemporaryPassword,
}) {
  useEffect(() => {
    document.addEventListener("click", exit);
    return () => document.removeEventListener("click", exit);
  }, []);
  const [confirmTemporaryPassword, setConfirmTemporaryPassword] = useState("");
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 ">
      <div
        className="rounded-2xl m-auto bg-white p-8 flex flex-col gap-4 max-w-150 "
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-semibold text-2xl text-gray-600">Admin</p>
        <p className="text-3xl">Reset User Password</p>
        <p>
          {user
            ? user.firstName + " " + user.lastName
            : "error could not find user"}
        </p>
        <p className="font-light ">
          Set a temporary password for this user. They'll be required to change
          it on next sign-in.
        </p>

        <label>
          <p>Temporary Password</p>
          <input
            type="password"
            value={temporaryPassword}
            onChange={(e) => setTemporaryPassword(e.target.value)}
            className="w-full rounded-lg border border-emerald-900 p-2 focus:outline-none"
          ></input>
        </label>

        <label>
          <p>Confirm Temporary Password</p>
          <input
            type="password"
            value={confirmTemporaryPassword}
            onChange={(e) => setConfirmTemporaryPassword(e.target.value)}
            className="w-full rounded-lg border border-emerald-900 p-2 focus:outline-none"
          ></input>
        </label>

        <button
          onClick={() => {
            if (temporaryPassword === confirmTemporaryPassword) {
              submit();
            } else if (temporaryPassword === "") {
              alert("temporary password can not be blank");
            } else {
              alert("passwords must match");
            }
          }}
          className="bg-emerald-900 border border-emerald-900 text-white rounded-lg p-2 cursor-pointer"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
