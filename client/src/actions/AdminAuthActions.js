import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_ADMIN } from "./types";

export const loginAdmin = adminData => dispatch => {
  axios
    .post("/admin/login", adminData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      const AdminToken = `admin ${token}`;

      // Set token to localStorage
      localStorage.setItem("jwtToken", AdminToken);
      // Set token to Auth header
      setAuthToken(AdminToken);
      // Decode token to get user data
      const decoded = jwt_decode(AdminToken);

      // Set current user
      dispatch(setAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setAdmin = decoded => {
  return {
    type: SET_ADMIN,
    payload: decoded
  };
};

// Log user out
export const logoutAdmin = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will also isAuthenticated to false
  dispatch(setAdmin({}));
};
