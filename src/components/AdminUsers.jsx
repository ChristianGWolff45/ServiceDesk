import { UserCog, UserPlus, Search } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { User } from "./User";
import { useState, useEffect } from "react";
import { UserForm } from "./UserForm";
import { useAuthContext } from "../context/AuthContext";
export function AdminUsers() {
  const { token } = useAuthContext();
  const {
    loading,
    users,
    createUser,
    editUser,
    setUserStatus,
    search,
    setSearch,
  } = useUsers(token);
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
      <div className="flex gap-4 p-2 border border-emerald-900 rounded-lg items-center">
        <Search />
        <input
          className="width-full focus:outline-none w-full"
          placeholder="Search for user using name, email, or phone number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="overflow-x-auto  border rounded-md">
        <div className=" rounded-t-md grid p-2 grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_2fr] gap-4">
          <p>Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Role</p>
          <p>Status</p>
          <p>Created</p>
          <p>Actions</p>
        </div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            editUser={editUser}
            setUserStatus={setUserStatus}
          />
        ))}
      </div>
      {addingUser && (
        <div
          onClick={() => setAddingUser(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserForm
              action="Create"
              onClose={setAddingUser}
              onSubmit={createUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}
