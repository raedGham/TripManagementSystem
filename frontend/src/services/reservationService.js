import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/reservs`;

//----------------------------------------------------
//  C R E A T E    N E W   T R I P
//----------------------------------------------------
export const registerReserv = async (reservData) => {
  try {
    const formData = new FormData();
    formData.append("numberOfPeople", reservData.numberOfPeople);
    formData.append("status", reservData.status);
    formData.append("tripID", reservData.tripID);
    formData.append("userID", reservData.userID); 
      

    const response = await axios.post(
      `${BACKEND_URL}/api/reservs/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Reservation Created Sucessfully");
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
//    G E T  A L L   T R I P S
//----------------------------------------------------
const getReservs = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   T R I P
//----------------------------------------------------
export const getReserv = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    T R I P
//----------------------------------------------------
const deleteReserv = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   T R I P
//----------------------------------------------------

export const updateReserv = async (id, reservData) => {
  try {
    const formData = new FormData();
    formData.append("numberOfPeople", reservData.numberOfPeople);
    formData.append("status", reservData.status);
    formData.append("tripID", reservData.tripID);
    formData.append("userID", reservData.userID); 
    
      const response = await axios.put(`${API_URL}/${id}`, formData, {
      withCredentials: true,
      
    });

    if (response.statusText === "OK") {
      toast.success("Reservation Updated Successfully");
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

const reservService = {
  registerReserv,
  getReservs,
  getReserv,
  deleteReserv,
  updateReserv,
};

export default reservService;
