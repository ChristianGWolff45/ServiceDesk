import { Header } from "../components/Header";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Issue() {
  const locations = ["...", "Beatty Pointe", "Longwood", "Oakmont"];
  const categories = ["...", "Password", "Lock out", "Wi-Fi"];
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
    console.log(formData);
  }
  const [formData, setFormData] = useState({
    Email: "",
    PhoneNumber: "",
    Subject: "",
    Location: "",
    Category: "",
    ErrorMessage: "",
    Description: "",
  });

  const [locationDropdown, setLocationDropdown] = useState(false);

  const [categoryDropdown, setCategoryDropdown] = useState(false);
  return (
    <div className="bg-green-50 h-screen pb-4">
      <div className="m-8 bg-white  flex flex-col items-center rounded-lg ">
        <h1 className="font-bold text-2xl p-4 border-b border-gray-400 w-full text-center">
          Create a Ticket
        </h1>
        <form className="w-9/10">
          <label className="flex flex-col gap-2 m-4">
            Email:
            <input
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={(e) => handleChange("Email", e.target.value)}
              className="border border-gray-700 rounded-sm p-2"
            ></input>
          </label>

          <p className="m-4">Phone Number: Please enter 10-digit number</p>

          <label className="flex flex-col gap-2 m-4">
            Phone Number:
            <input
              name="Phone Number"
              placeholder=""
              value={formData.PhoneNumber}
              onChange={(e) => handleChange("PhoneNumber", e.target.value)}
              className="border border-gray-700 rounded-sm p-2"
            ></input>
          </label>

          <label className="flex flex-col gap-2 m-4">
            Subject:
            <input
              name="Subject"
              placeholder=""
              value={formData.Subject}
              onChange={(e) => handleChange("Subject", e.target.value)}
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
                  {formData.Location != "" ? formData.Location : "..."}
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
                      type="button"
                      onClick={() => handleChange("Location", location)}
                      className={`cursor-pointer text-left rounded-md p-2 ${location === formData.Location ? "bg-blue-100" : ""}`}
                    >
                      {location}
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
                  {formData.Category != "" ? formData.Category : "..."}
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
                      type="button"
                      onClick={() => handleChange("Category", category)}
                      className={`cursor-pointer text-left rounded-md p-2 ${category === formData.Category ? "bg-blue-100" : ""}`}
                    >
                      {category}
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
              value={formData.ErrorMessage}
              onChange={(e) => handleChange("ErrorMessage", e.target.value)}
            ></input>
          </label>
          <label className="m-4 flex flex-col rounded-sm">
            Description:
            <textarea
              className="h-50 w-full border mt-4 p-2 rounded-sm"
              placeholder="Enter Ticket description Here"
              value={formData.Description}
              onChange={(e) => handleChange("Description", e.target.value)}
            ></textarea>
          </label>
          <div className="flex justify-self-end gap-4 pb-4">
            <button
              className="cursor-pointer border rounded-sm font-semibold p-2 pl-4 pr-4"
              onClick={clearIssue}
            >
              Cancel
            </button>
            <button className="cursor-pointer border rounded-sm font-semibold p-2 pl-4 pr-4 text-white bg-green-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
