import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTrip } from "../../redux/features/trips/tripSlice";
import { BACKEND_URL } from "../../services/tripService";

function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { trip, isLoading, isError, message } = useSelector(
    (state) => state.trip
  );

  useEffect(() => {
    dispatch(getTrip(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading trip details...
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {message || "Trip not found"}
      </div>
    );
  }

 return (
  <div className="max-w-7xl mx-auto mt-[20px] px-6 py-12 text-gray-900 dark:text-white">
    {/* Header */}
    <p className="text-4xl font-bold mb-8">Your Journey Starts Here</p>

  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
  
      {/* Left side (trip info) */}
      <div className="md:col-span-1 space-y-8 leading-relaxed">
        <h1 className="text-4xl font-bold mt-[40px]">{trip.title}</h1>

        <p className="text-gray-300 text-lg leading-8">{trip.details}</p>

        <div className="mt-6 space-y-3 text-lg">
  <div className="flex">
    <span className="text-gray-500 w-40">Destination:</span>
    <span>{trip.destination}</span>
  </div>
  <div className="flex">
    <span className="text-gray-500 w-40">Demographic:</span>
    <span>{trip.demographic}</span>
  </div>
  {trip.startDate && (
    <div className="flex">
      <span className="text-gray-500 w-40">Start Date:</span>
      <span>{new Date(trip.startDate).toLocaleDateString()}</span>
    </div>
  )}
  {trip.endDate && (
    <div className="flex">
      <span className="text-gray-500 w-40">End Date:</span>
      <span>{new Date(trip.endDate).toLocaleDateString()}</span>
    </div>
  )}
  <div className="flex">
    <span className="text-gray-500 w-40">Price/Person:</span>
    <span>${trip.pricePerPerson}</span>
  </div>
</div>
      </div>

  
      <div className="md:col-span-2">
        <img
          src={`${BACKEND_URL}/${trip.thumbnail}`}
          alt={trip.title}
          className="w-full h-[500px] rounded-2xl shadow-xl object-cover"
        />
      </div>
    </div>

    {/* Activities Section */}
    <div>
      <h3 className="text-3xl font-semibold mb-6">Activities</h3>
      <ul className="list-disc ml-8 text-gray-300 text-lg leading-8 space-y-2">
        {trip.activities && trip.activities.length > 0 ? (
          trip.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))
        ) : (
          <li>No activities listed.</li>
        )}
      </ul>
    </div>

    {/* Transportation Section */}
    <div className="mt-16">
      <h3 className="text-3xl font-semibold mb-6">Transportation</h3>
      <ul className="list-disc ml-8 text-gray-300 text-lg leading-8 space-y-2">
        {trip.transportation && trip.transportation.length > 0 ? (
          trip.transportation.map((t, index) => <li key={index}>{t}</li>)
        ) : (
          <li>No transportation info available.</li>
        )}
      </ul>
    </div>
  </div>
);

}

export default TripDetails;
