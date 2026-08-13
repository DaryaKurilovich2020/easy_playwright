export const VALID_LOGIN_DATA = {
  username: "testautomation",
  password: "Password1234",
};

export const INVALID_LOGIN_DATA = [
  {
    description: "empty credentials",
    username: "",
    password: "",
  },

  {
    description: "empty password",
    username: "testautomation",
    password: "",
  },

  {
    description: "empty username",
    username: "",
    password: "Password1234",
  },

  {
    description: "invalid credentials",
    username: "incorrect",
    password: "incorrect",
  },
];
