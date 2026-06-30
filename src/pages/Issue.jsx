import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { UseLocations } from "../hooks/useLocations";
import { useCategories } from "../hooks/useCategories";
import { useTickets } from "../hooks/useTickets";
import { useUsers } from "../hooks/useUsers";
import { emailRegex, validateTicket } from "../utils/validateUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
export function Issue() {
  const navigate = useNavigate();
  const { isLoggedIn, user: currentUser } = useAuthContext();
  const { locations } = UseLocations();
  const { categories } = useCategories();
  const { createTicket } = useTickets();
  const { getUserByEmail, user } = useUsers();

  function clearIssue() {
    setFormData({
      Email: "",
      PhoneNumber: "",
      Subject: "",
      Location: "",
      Category: "",
      ErrorMessage: "",
      Description: "",
    });
  }
  function handleChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const [formData, setFormData] = useState({
    email: isLoggedIn ? currentUser.email : "",
    phoneNumber: "",
    subject: "",
    location: "",
    category: "",
    errorMessage: "",
    description: "",
  });
  useEffect(() => {
    if (emailRegex.test(formData.email)) {
      getUserByEmail(formData.email);
    }
  }, [formData.email]);

  useEffect(() => {
    if (user) {
      handleChange("phoneNumber", user.phone_number);
    }
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    const user = await getUserByEmail(formData.email);
    const errors = validateTicket({ userId: user.id, formData });
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).map((error) => error + "\n"));
      return;
    }
    createTicket({
      requesterId: user.id,
      title: formData.subject,
      location: formData.location,
      category: formData.category,
      errorMessage: formData.errorMessage,
      description: formData.description,
    });
    navigate("/ticketPostSuccess");
  }

  const [locationDropdown, setLocationDropdown] = useState(false);

  const [categoryDropdown, setCategoryDropdown] = useState(false);
  return (
    <div className="bg-green-50 h-screen">
      <div className="m-8 bg-white  flex flex-col items-center rounded-lg ">
        <h1 className="font-bold text-2xl p-4 border-b border-gray-400 w-full text-center">
          Create a Ticket
        </h1>
        <form className="w-9/10" onSubmit={(e) => handleSubmit(e)}>
          <label className="flex flex-col gap-2 m-4">
            Email:
            <input
              type="input"
              name="Email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border border-gray-700 rounded-sm p-2"
            ></input>
          </label>

          <p className="m-4">Phone Number: Please enter 10-digit number</p>

          <label className="flex flex-col gap-2 m-4">
            Phone Number:
            <input
              name="Phone Number"
              placeholder=""
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="border border-gray-700 rounded-sm p-2"
            ></input>
          </label>

          <label className="flex flex-col gap-2 m-4">
            Subject:
            <input
              name="Subject"
              placeholder=""
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="border border-gray-700 rounded-sm p-2"
            ></input>
          </label>
          <div className="flex justify-between w-full">
            <label className="flex flex-col gap-2 m-4 w-full">
              Location:
              <button
                type="button"
                className="border border-gray-700 flex justify-between p-1.5 rounded-md cursor-pointer"
                onClick={() => setLocationDropdown(!locationDropdown)}
              >
                <span className="ml-4 font-semibold">
                  {formData.location != "" ? formData.location : "..."}
                </span>
                {locationDropdown ? (
                  <ChevronUp className="w-5" />
                ) : (
                  <ChevronDown className="w-5" />
                )}
              </button>
              {locationDropdown && (
                <div className="flex flex-col self-start h-50 overflow-y-scroll w-full border rounded-md cursor-pointer">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => {
                        handleChange("location", location.location);
                        setLocationDropdown(false);
                      }}
                      className={`cursor-pointer text-left rounded-md p-2 ${location.location === formData.Location ? "bg-blue-200" : "hover:bg-blue-100"}`}
                    >
                      {location.location}
                    </button>
                  ))}
                </div>
              )}
            </label>

            <label className="flex flex-col gap-2 m-4 w-full">
              Category:
              <button
                type="button"
                className="border border-gray-700 flex justify-between p-1.5 rounded-md cursor-pointer"
                onClick={() => setCategoryDropdown(!categoryDropdown)}
              >
                <span className="ml-4 font-semibold">
                  {formData.category != "" ? formData.category : "..."}
                </span>
                {locationDropdown ? (
                  <ChevronUp className="w-5" />
                ) : (
                  <ChevronDown className="w-5" />
                )}
              </button>
              {categoryDropdown && (
                <div className="flex flex-col self-start h-50 overflow-y-scroll w-full border rounded-md cursor-pointer">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        handleChange("category", category.category);
                        setCategoryDropdown(false);
                      }}
                      className={`cursor-pointer text-left rounded-md p-2 ${category.category === formData.Category ? "bg-blue-200" : "hover:bg-blue-100"}`}
                    >
                      {category.category}
                    </button>
                  ))}
                </div>
              )}
            </label>
          </div>
          <label className="m-4 flex flex-col rounded-sm">
            Error Message (if applicable)
            <input
              className="border p-2 rounded-sm"
              value={formData.errorMessage}
              onChange={(e) => handleChange("errorMessage", e.target.value)}
            ></input>
          </label>
          <label className="m-4 flex flex-col rounded-sm">
            Description:
            <textarea
              className="h-50 w-full border mt-4 p-2 rounded-sm"
              placeholder="Enter Ticket description Here"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </label>
          <div className="flex justify-self-end gap-4 pb-4">
            <button
              type="button"
              className="cursor-pointer border rounded-sm font-semibold p-2 pl-4 pr-4"
              onClick={clearIssue}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer border rounded-sm font-semibold p-2 pl-4 pr-4 text-white bg-green-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
