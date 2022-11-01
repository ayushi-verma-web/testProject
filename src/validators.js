
const validateCreateUser = (values) => {
  console.log(values, 'kkkkkkkkkkkkkkkk');
  const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errors = {};
  let isValid = true;
  if (!values.email) {
    errors.email = "This field is required";
    isValid = false;
  }
  if (values.email !== "" && values.email && !EmailRegex.test(values.email)) {
    errors.email = "Enter a valid email address.";
    isValid = false;
  }
  if (!values.first_name) {
    errors.first_name = "This field is required";
    isValid = false;
  }
  if (!values.last_name) {
    errors.last_name = "This field is required";
    isValid = false;
  }
  return { isValid: isValid, errors: errors };
};

export { validateCreateUser };
