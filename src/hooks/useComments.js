import { API_URL } from "./API_URL";
import { useState, useEffect } from "react";

export function useComments(ticketId, token) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  async function getComments() {
    if (!ticketId) return;
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function createComment(_body, _isInternal, token) {
    if (!ticketId) return;
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: _body,
          isInternal: _isInternal,
        }),
      });

      if (!response.ok) {
        throw new Error("failed to create comment");
      }

      const data = await response.json();
      console.log(data.id);
      setComments([...comments, data]);
    } catch (error) {
      console.log(error);
    } finally {
      return comments;
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return { loading, comments, createComment };
}

export function postPublicComments() {}
