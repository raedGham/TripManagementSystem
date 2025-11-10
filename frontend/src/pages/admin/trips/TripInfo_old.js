import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrip, selectTrip } from "../../../redux/features/trips/tripSlice";
import {
  fetchTripImages,
  uploadTripImages,
  removeTripImage,
} from "../../../redux/features/trips/tripImagesSlice";

function TripInfo() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const trip = useSelector(selectTrip);
  useEffect(() => {
    dispatch(getTrip(id));
  }, [dispatch, id]);
  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
  } = trip || {}; // safe destructure

  //---------------------
  // TRIP IMAGES
  //---------------------

  const { images, isLoading } = useSelector((state) => state.tripImages);

  useEffect(() => {
    dispatch(fetchTripImages(id));
  }, [id]);

  const handleUpload = (e) => {
    const files = [...e.target.files];
    dispatch(uploadTripImages({ id, files }));
  };

  const handleDelete = (imageId) => {
    dispatch(removeTripImage({ id, imageId }));
  };

  return (
    <section className="m-12 text-white space-y-10">
      {trip && (
        <>
          {/* Trip Header */}
          <header className="bg-gray-800/40 p-8 rounded-xl shadow-lg space-y-4">
            <h1 className="text-3xl font-semibold tracking-wide">{title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <p>
                <span className="text-gray-400">Destination:</span>{" "}
                {destination}
              </p>
              <p>
                <span className="text-gray-400">Demographic:</span>{" "}
                {demographic}
              </p>
              <p>
                <span className="text-gray-400">Start Date:</span> {startDate}
              </p>
              <p>
                <span className="text-gray-400">End Date:</span> {endDate}
              </p>
              <p>
                <span className="text-gray-400">Price / Person:</span>{" "}
                {pricePerPerson}
              </p>
              <p>
                <span className="text-gray-400">Organizer:</span>{" "}
                {organizerID?.name}
              </p>
            </div>
          </header>
        </>
      )}
    </section>
  );
}

export default TripInfo;
