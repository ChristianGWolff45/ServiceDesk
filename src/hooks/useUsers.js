import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";
export function useUsers(token) {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  async function getUsers() {
    try {
      const params = new URLSearchParams();
      if (search !== "") {
        params.append("search", search);
      }
      setLoading(true);
      const response = await fetch(`${API_URL}/users?${params.toString()}`);
      const users = await response.json();
      setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, [search]);

  async function createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    tempPassword,
  }) {
    console.log(
      JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        tempPassword,
      }),
    );
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          role,
          tempPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("failed to create new user");
      }
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.log(error);
      return;
    } finally {
    }
  }

  async function editUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    userId,
  }) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, role }),
      });

      if (!response.ok) {
        throw new Error("failed to update user");
      }
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        }),
      );
    } catch (error) {}
  }

  async function setUserStatus(userId, activate) {
    userId = Number(userId);
    if (!Number.isInteger(userId) || userId < 0) {
      throw new Error("invalid user id");
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/${activate ? "activate" : "deactivate"}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await response.json();
      setUsers((prev) => {
        return prev.map((user) => {
          if (user.id === data.id) {
            return data;
          } else {
            return user;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserByEmail(email) {
    try {
      const response = await fetch(`${API_URL}/users/byEmail/${email}`);
      if (response.status === 404) {
        return;
      }

      if (!response.ok) {
        return console.log(response);
      }

      const data = await response.json();
      if (data) {
        setUser(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserById(userId) {
    if (!userId) return;
    if (userId > 0) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        const data = await response.json();
        return data;
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  }
  return {
    loading,
    users,
    createUser,
    editUser,
    setUserStatus,
    getUserByEmail,
    getUserById,
    search,
    setSearch,
    user,
  };
}
