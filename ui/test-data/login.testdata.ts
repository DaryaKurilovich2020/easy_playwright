export const VALID_LOGIN_DATA = {
    "username" : "testautomation",
    "password" : "Password1234"
}

export const INVALID_LOGIN_DATA = [
    {
        username: "",
        password: ""
    },

    {
        username: "testautomation",
        password: ""

    },

    {
        username: "",
        password: "Password1234"
    },

    {
        username: "incorrect",
        password: "incorrect"
    }
]