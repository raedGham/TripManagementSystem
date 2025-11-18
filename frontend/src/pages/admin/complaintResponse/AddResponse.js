import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerResponse } from "../../services/responseService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ResponseForm from "./ResponseForm";

import {
  getResponse,
  selectIsLoading,
} from "../../redux/features/response/complaintSlice";

const initialState = {
  userID: "",
  status: "",
  complainText: "",
  category: "",
  dateFiled: "",
  supervisorID: "",
  dateReviewed: "",
  _response: "",
};

const AddResponse = () => {
  const [formData, setFormData] = useState(initialState);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const { category, status, responseText, dateFiled } = formData;

  const navigate = useNavigate();
  const { id } = useParams();

  // Use the selector you exported from the slice

  const isLoadingResponse = useSelector(selectIsLoading);

  console.log("userid:", userID);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addResponse = async (e) => {
    e.preventDefault();

    // validation
    if (!dateFiled || !status || !category || !responseText) {
      return toast.error("Missing Fields");
    }

    const responseData = {
      userID,
      category,
      status,
      responseText,
      dateFiled,
    };

    console.log("ResponseData:", responseData);

    setIsResponseLoading(true);
    // attempts to save the new trip
    try {
      const data = await registerResponse(responseData);
      toast.success("Response Added Successfully");
      navigate(-1);
      setIsResponseLoading(false);
    } catch (error) {
      setIsResponseLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <ResponseForm
      status={status}
      responseText={responseText}
      category={category}
      dateFiled={dateFiled}
      handleInputChange={handleInputChange}
      addResponse={addResponse}
      formTitle={"Add Response"}
      isLoading={isResponseLoading}
      isLoadingResponse={isLoadingResponse}
    />
  );
};

export default AddResponse;
