import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerPayment } from "../../services/paymentService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";

import { selectUserID } from "../../redux/features/auth/authSlice";
import { getReserv } from "../../redux/features/reservation/ReservationSlice";

const initialState = {
  paymentDate: "",
  amount: "",
  paymentMethod:"",
  reservationID :"",
};

const AddPayment = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { reservationID } = useParams();

  const { paymentDate, amount, paymentMethod } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  useEffect(() => {
    if (reservationID) {
      dispatch(getReserv(reservationID));
    }
  }, [dispatch,reservationID]);

  const { reserv } = useSelector((state) => state.reservation);

  console.log("reservationID:", reservationID)
  console.log("reserv:", reserv)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addPayment = async (e) => {
    e.preventDefault();

    // validation
    if (!paymentDate) {
      return toast.error("Please Specify Payment Date");
    }

    const PaymentData = {
        paymentDate: paymentDate,
        amount: amount,
        paymentMethod: paymentMethod,
        reservationID : reservationID,
    };



    console.log("PaymentData:", PaymentData);

    setIsLoading(true);
    // attemps to save the new trip
    try {
      const data = await registerPayment(PaymentData);
      toast.success("Payment Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

 

  return (
    <PaymentForm
      paymentDate={paymentDate}
      amount={amount}
      paymentMethod={paymentMethod}
      reserv={reserv}
      handleInputChange={handleInputChange}
      addPayment={addPayment}
      formTitle={"Add Payment"}
    
    />
  );
};

export default AddPayment;
