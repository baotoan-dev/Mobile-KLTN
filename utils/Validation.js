export const validateEmail = (email) => {
  if (email.length < 6) {
    return {
      isValid: false,
      message: "Email is too short.",
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Email is not valid.",
    }
  }

  return {
    isValid: true,
    message: "Email is valid.",
  }
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password is too short.",
    }
  } 

  // password have number and character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message: "Password must have number and character.",
    }
  }

  return {
    isValid: true,
    message: "Password is valid.",
  }
}
