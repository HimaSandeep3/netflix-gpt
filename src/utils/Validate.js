export const validateEmailAndPassword = (email, password) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid Email";
    }
    if (!passwordRegex.test(password)) {
      return "Invalid Password";
    }
    return null;
};

export const validateForm = (email, password, fName) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!fName || fName.trim() === "") {
      return "Full Name is required";
    }
    if (!nameRegex.test(fName)) {
      return "Invalid Full Name (only letters and spaces allowed)";
    }
    if (!emailRegex.test(email)) {
      return "Invalid Email";
    }
    if (!passwordRegex.test(password)) {
      return "Invalid Password";
    }
    return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return "Invalid Email";
  }
  return null;
}