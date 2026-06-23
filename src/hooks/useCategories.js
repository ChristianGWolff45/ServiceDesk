import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        return console.log("failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (errors) {
      console.log(errors);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
}
