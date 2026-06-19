import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";

export function useComments(ticketId) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  async function getComments() {
    if (!ticketId) return;
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return { loading, comments };
}
