import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/transs`;

//----------------------------------------------------
//  C R E A T E    N E W   T R A N S
//----------------------------------------------------
export const registerTrans = async (transData) => {
  try {
    const formData = new FormData();
    formData.append("type", transData.type);
    formData.append("arrivalLocation", transData.arrivalLocation);
    formData.append("departureLocation", transData.departureLocation);
    formData.append("arrivalDate", transData.arrivalDate);
    formData.append("departureDate", transData.departureDate);
    formData.append("duration", transData.duration);
    formData.append("duration", transData.costPerTrip);
    formData.append("tripID", transData.tripID);

    const response = await axios.post(
      `${BACKEND_URL}/api/transs/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Trans Created Sucessfully");
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
//    G E T  A L L   T R A N S S
//----------------------------------------------------
const getTranses = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   T R A N S
//----------------------------------------------------
export const getTrans = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    T R A N S
//----------------------------------------------------
const deleteTrans = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   T R A N S
//----------------------------------------------------

export const updateTrans = async (id, transData) => {
  try {
    const formData = new FormData();
    formData.append("title", transData.title);
    formData.append("destination", transData.destination);
    formData.append("demographic", transData.demographic);
    formData.append("startDate", transData.startDate);
    formData.append("endDate", transData.endDate);
    formData.append("pricePerPerson", transData.pricePerPerson);
    formData.append("organiserID", transData.organiserID);

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.statusText === "OK") {
      toast.success("Trans Updated Successfully");
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

const transService = {
  registerTrans,
  getTranses,
  getTrans,
  deleteTrans,
  updateTrans,
};

export default transService;
