import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

//----------------------------------------------------
//  R E G I S T E R   N E W   U S E R
//----------------------------------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("User Registered sucessfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//  L O G I N   U S E R
//----------------------------------------------------

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      // toast.success("Login sucessfull")
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//  L O G O U T   U S E R
//----------------------------------------------------

export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//GET LOGIN STATUS
//----------------------------------------------------

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`, {
      withCredentials: true, // 👈 important for cookies
    });
    console.log(response.data);
    return response.data; // should be true or false
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    return false;
  }
};

//----------------------------------------------------
//    G E T  A L L   U S E R S
//----------------------------------------------------
export const getUsers = async () => {
  const reponse = await axios.get(`${BACKEND_URL}/api/users/`);
  return reponse.data;
};
