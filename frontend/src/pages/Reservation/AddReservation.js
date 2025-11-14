import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerReserv } from "../../../services/ReservService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReservForm from "./ReserveForm";

import { selectUser } from '../../redux/features/auth/authSlice';

const initialState = {
  numberOfPeople: "",
  status: "",
  
};

const AddReservation = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  tripID = useParams()
  const {
   numberOfPeople,
   status,   
  } = formData;

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const addReserv = async (e) => {
    e.preventDefault();

    // validation
    if (!numberOfPeople || !status ) {
      return toast.error("All fields are required");
    }

    const ReservData = {
      numberOfPeople,
      status,
      tripID: {tripID},
      userID: user._id,      
    };
    console.log(ReservData);

    setIsLoading(true);
    // attemps to save the new trip
    try {
      const data = await registerReserv(ReservData);
      toast.success("Reservation Added Sucessfully");
      navigate("/Main");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <ReservForm
      numberOfPeople={numberOfPeople}
      status={status}
      userID={user._id}
      handleInputChange={handleInputChange}
      addReserv={addReserv}
      formTitle={"Add Reservation"}
    />
  );
};

export default AddReservation;

