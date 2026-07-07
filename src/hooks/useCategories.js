import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";

export function useCategories(token) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getCategories() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        return console.log("failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (errors) {
      console.log(errors);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function updateCategory(categoryId, categoryName) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName }),
      });
      if (!response.ok) {
        return console.log(response);
      }
      const data = await response.json();
      console.log(data);
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id === data.id) {
            return data;
          } else {
            return category;
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function createCategory(categoryName) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        Authorization: `Bearer ${token}`,
        body: JSON.stringify({ categoryName }),
      });
      if (!response.ok) {
        return console.log(response);
      }
      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCategory(categoryId) {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        return console.log(response);
      }
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return {
    categories,
    loading,
    updateCategory,
    createCategory,
    deleteCategory,
  };
}
