const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
