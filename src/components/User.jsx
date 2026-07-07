import { useUser } from "../hooks/useUser";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UserForm } from "./UserForm";
export function User({ user, editUser, setUserStatus }) {
  const [editingUser, setEditingUser] = useState(false);
  return (
    <div className=" border-t items-center p-2  grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_2fr] gap-4">
      <div>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
      </div>

      <p>{user.email}</p>
      <p>{user.phone_number}</p>
      <p>{user.role}</p>
      <div>
        <p
          className={`w-fit pl-2 pr-2 rounded-md ${user.is_active ? "bg-green-200 border border-emerald-900" : "bg-orange-200 border border-amber-900"}`}
        >
          {user.is_active ? "active" : "inactive"}
        </p>
      </div>
      <p>{new Date(user.created_at).toLocaleDateString([], {})}</p>
      <div className="flex gap-16">
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setEditingUser(true)}
        >
          <Pencil />
          Edit
        </button>
        <button
          className="cursor-pointer"
          onClick={() => setUserStatus(user.id, !user.is_active)}
        >
          {user.is_active ? "Deactivate" : "Activate"}
        </button>
      </div>
      {editingUser && (
        <div
          className="inset-0 fixed bg-black/50 flex items-center justify-center"
          onClick={() => setEditingUser(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserForm
              action="Update"
              onClose={setEditingUser}
              onSubmit={editUser}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
}
