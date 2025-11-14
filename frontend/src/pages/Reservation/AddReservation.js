import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import { registerReserv } from "../../services/reservationService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReservationForm from "./ReservationForm";

import { selectUser } from '../../redux/features/auth/authSlice';
import { getTrip } from "../../redux/features/trips/tripSlice";

const initialState = {
  numberOfPeople: "",
  status: "",
  
};

const AddReservation = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const  tripID = useParams()

  const {
   numberOfPeople,
   status,   
  } = formData;

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
  if (tripID) {
    dispatch(getTrip(tripID));
  }
}, [dispatch, tripID]);

const { trip } = useSelector((state) => state.trip);


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
      tripID: trip._id,
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
    <ReservationForm
      numberOfPeople={numberOfPeople}
      status={status}
      trip={trip}
      userID = {user._id}      
      handleInputChange={handleInputChange}
      addReserv={addReserv}
      formTitle={"Add Reservation"}
    />
  );
};

export default AddReservation;

