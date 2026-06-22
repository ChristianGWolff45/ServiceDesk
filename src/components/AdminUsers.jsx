import { UserCog, UserPlus } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { User } from "./User";
import { useState, useEffect } from "react";
import { AddUser } from "./AddUser";
export function AdminUsers() {
  const { loading, users } = useUsers();
  const [addingUser, setAddingUser] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-16 m-32  border rounded-2xl text-xl font-semibold">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="font-normal">
            Manage access, roles, and account status
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="flex gap-1 cursor-pointer border border-emerald-900 rounded-lg bg-emerald-900 p-2 text-white"
            onClick={() => setAddingUser(true)}
          >
            <UserPlus />
            Add User
          </button>
        </div>
      </div>
      <div className="overflow-x-auto  border rounded-md">
        <div className=" border-b rounded-t-md grid p-2 grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_2fr] gap-4">
          <p>Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Role</p>
          <p>Status</p>
          <p>Created</p>
          <p>Actions</p>
        </div>
        {users.map((user) => (
          <User key={user.id} userId={user.id} />
        ))}
      </div>
      {addingUser && (
        <div
          onClick={() => setAddingUser(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddUser />
          </div>
        </div>
      )}
    </div>
  );
}
