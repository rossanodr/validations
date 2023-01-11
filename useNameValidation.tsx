export const useNameValidation = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;
  if (!nameRegex.test(name)) {
    return false;
  } else {
    return true;
  }
};
export const useValidateFirstName = (name: string): boolean => {
/* Checking for a minimum of 2 characters, and allowing spaces and dashes. */
  const firstNameRegex = /^[a-zA-Z\s-]{2,}$/;
  if (!firstNameRegex.test(name)) {
    return false;
  } else {
    return true;
  }
};
export const useValidateFullName = (name: string): boolean => {
  const fullNameRegex = /^[a-zA-Z]{2,}[\s-][a-zA-Z]{2,}(?:[\s-][a-zA-Z]{2,})*$/;
  if (!fullNameRegex.test(name)) {
    return false;
  } else {
    return true;
  }
};
