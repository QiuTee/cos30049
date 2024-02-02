// Tran Thanh Minh - 103809048
import { createContext, useContext, useReducer } from "react";
import APIendpoint from "../data/APIendpoint";
import { FAKE_USER } from "./../data/FAKE_USER";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login": // If the action type is login, then return the new state with the user and isAuthenticated
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout": // If the action type is logout, then return the new state with the user and isAuthenticated
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default: // If the action type is not login or logout, then return the current state
      return state;
  }
}
function AuthProvider({ children }) {
  // The AuthProvider component will be used to wrap the App component
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // check if the API endpoint is not work, then the username and password will be compared with the FAKE_USER
  async function login({ username, password }) {
    // The login function will be used to login the user
    const formData = new FormData(); // Create a new FormData object
    formData.append("username", username); // Append the username and password to the FormData object
    formData.append("password", password);
    let result = undefined; // Initialize the result variable
    if (username === FAKE_USER.username && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
      result = true;
    } else {
      try {
        const response = await fetch(`${APIendpoint}/login`, {
          // Send a POST request to the login endpoint
          method: "POST",
          body: formData,
        });
        result = await response.json(); // Parse the response as JSON
        if (response.ok) {
          // If the response is successful
          dispatch({
            type: "login",
            payload: await response.json(),
          });
        } else {
          throw new Error("Invalid email or password");
        }
      } catch (error) {
        console.error(error && error.message);
      }
    }
    return result;
  }

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
