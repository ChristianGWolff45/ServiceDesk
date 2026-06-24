import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";
export function UseLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getLocations() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/locations`);
      if (!response.ok) {
        return console.log(response);
      }
      const locations = await response.json();
      setLocations(locations);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLocations();
  }, []);
  return (locations, loading);
}
