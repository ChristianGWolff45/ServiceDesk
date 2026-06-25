export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export function validateUser(values) {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!phoneRegex.test(values.phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number";
  }

  return errors;
}

export function validateTicket(values) {
  console.log(JSON.stringify(values));
  const errors = {};
  if (!values.formData.location.trim()) {
    errors.location = "Location is required";
  }

  if (!values.formData.category.trim()) {
    errors.category = "Category is required";
  }

  if (!values.formData.description.trim()) {
    errors.description = "Description is required";
  }

  if (!Number.isInteger(values.userId) || values.userId < 0) {
    errors.user = "Not a valid user. sign in or check email";
  }

  if (!emailRegex.test(values.formData.email)) {
    errors.email = "Enter a valid email";
  }

  if (!phoneRegex.test(values.formData.phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number";
  }
  return errors;
}
