import { API_URL } from "./API_URL";
export async function createTicket({
  requesterId,
  title,
  location,
  category,
  errorMessage,
  description,
  token,
}) {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requesterId,
        title,
        location,
        category,
        errorMessage,
        description,
      }),
    });
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
