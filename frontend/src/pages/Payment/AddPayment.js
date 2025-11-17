import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerPayment } from "../../services/paymentService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";

import { selectUserID } from "../../redux/features/auth/authSlice";
import {
  getReserv,
  selectIsLoading,
  selectReserv,
} from "../../redux/features/reservation/ReservationSlice";

const initialState = {
  paymentDate: "",
  amount: "",
  paymentMethod: "",
  reservationID: "",
};

const AddPayment = () => {
  const [formData, setFormData] = useState(initialState);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const { reservationID } = useParams();

  const { paymentDate, amount, paymentMethod } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  // Use the selector you exported from the slice
  const reserv = useSelector(selectReserv);
  const isLoadingReserv = useSelector(selectIsLoading);

  console.log("reserv:", reserv);
  console.log("reservationID:", reservationID);
  console.log("isLoadingReserv:", isLoadingReserv);

  useEffect(() => {
    if (reservationID) {
      console.log("Dispatching getReserv with ID:", reservationID);
      dispatch(getReserv(reservationID));
    }
  }, [dispatch, reservationID]);

  // to calculate total price
  useEffect(() => {
    console.log("reserv changed:", reserv);
    if (reserv && reserv.tripID) {
      const total = reserv.tripID.pricePerPerson * reserv.numberOfPeople || 0;
      console.log("Calculated total:", total);

      setFormData((prev) => ({
        ...prev,
        amount: total,
      }));
    }
  }, [reserv]);

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

    const paymentData = {
      paymentDate: paymentDate,
      amount: amount,
      paymentMethod: paymentMethod,
      reservationID,
    };

    console.log("PaymentData:", paymentData);

    setIsPaymentLoading(true);
    // attempts to save the new trip
    try {
      const data = await registerPayment(paymentData);
      toast.success("Payment Added Successfully");
      navigate(-1);
      setIsPaymentLoading(false);
    } catch (error) {
      setIsPaymentLoading(false);
      console.log(error.message);
      toast.error(error.message);
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
      isLoading={isPaymentLoading}
      isLoadingReserv={isLoadingReserv}
    />
  );
};

export default AddPayment;
