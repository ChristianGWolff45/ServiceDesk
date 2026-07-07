import { API_URL } from "./API_URL";
export async function createTicket({
  requesterId,
  title,
  location,
  category,
  errorMessage,
  description,
}) {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
