import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTrans, getTrans } from "../../../services/transService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import TransForm from "./TransForm";

const AddTrans = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [duration, setDuration] = useState("");
  const [costPerTrip, setCostPerTrip] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load trans details
  useEffect(() => {
    async function fetchData() {
      try {
        const trans = await getTrans(id);
        setType(trans.type);
        setArrivalLocation(trans.arrivalLocation);
        setDepartureLocation(trans.departureLocation);
        setArrivalDate(trans.arrivalDate);
        setDepartureDate(trans.departureDate);
        setDuration(trans.duration);
        setCostPerTrip(trans.costPerTrip);
      } catch (err) {
        toast.error("Failed to load trans details");
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "type":
        setType(value);
        break;
      case "arrivalLocation":
        setArrivalLocation(value);
        break;

      case "departureLocation":
        setDepartureLocation(value);
        break;
      case "arrivalDate":
        setArrivalDate(value);
        break;
      case "departureDate":
        setDepartureDate(value);
        break;
      case "duration":
        setDuraion(value);
        break;
      case "costPerTrip":
        setCostPerTrip(value);
        break;
    }
  };

  const addTrans = async (e) => {
    e.preventDefault();

    // validation
    if (
      !type ||
      !arrivalLocation ||
      !departureLocation ||
      !arrivalDate ||
      !departureDate ||
      !duration ||
      !costPerTrip
    ) {
      return toast.error("All fields are required");
    }

    const transData = {
      type,
      arrivalLocation,
      departureLocation,
      arrivalDate,
      departureDate,
      duration,
      costPerTrip,
      tripID,
    };
    setIsLoading(true);
    // attemps to save the new trans
    try {
      const data = await registerTrans(transData);
      toast.success("Trans Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <TransForm
      type={type}
      arrivalLocation={arrivalLocation}
      departureLocation={departureLocation}
      arrivalDate={arrivalDate}
      departureDate={departureDate}
      duration={duration}
      costPerTrip={costPerTrip}
      tripID={tripID}
      handleInputChange={handleInputChange}
      addTrans={addTrans}
      formTitle={"Add Trans"}
    />
  );
};

export default AddTrans;
