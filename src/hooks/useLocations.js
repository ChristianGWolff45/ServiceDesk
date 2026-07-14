import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";
export function useLocations(token) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getLocations() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  async function updateLocation(locationId, location) {
    locationId = Number(locationId);
    if (!Number.isInteger(locationId) || locationId < 0) {
      return console.log("not a valid id");
    }
    try {
      const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });
      if (!response.ok) {
        return console.log(response);
      }
      const updatedLocation = await response.json();
      setLocations((prev) =>
        prev.map((location) => {
          if (location.id === updatedLocation.id) {
            return updatedLocation;
          } else {
            return location;
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLocation(locationId) {
    locationId = Number(locationId);
    if (!Number.isInteger(locationId) || locationId < 0) {
      return console.log("not a valid id");
    }
    try {
      const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        return console.log(response);
      }
      setLocations((prev) =>
        prev.filter((location) => {
          if (locationId !== location.id) return location;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function createLocation(location) {
    try {
      const response = await fetch(`${API_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });
      if (!response.ok) {
        return console.log(response);
      }
      const data = await response.json();
      setLocations((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  }

  return { locations, loading, createLocation, updateLocation, deleteLocation };
}
