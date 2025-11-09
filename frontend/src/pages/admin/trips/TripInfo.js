import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrip, selectTrip } from "../../../redux/features/trips/tripSlice";

function TripInfo() {
  const { id } = useParams();

  const [files, setFiles] = useState([]);

  const selectImages = (e) => setFiles(e.target.files);

  const uploadImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    await fetch(`/api/tripImages/add/${id}`, {
      method: "POST",
      body: formData,
    });

    dispatch(getTrip(id)); // refresh trip info + pictures
  };

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

          {/* Images + Add/Delete Controls */}
          <div className="flex gap-8">
            {/* Left side: Image list */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Trip Pictures</h2>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
                  onClick={() => console.log("Add Image Clicked")}
                >
                  Add Image old
                </button>

                <button
                  onClick={() =>
                    document.getElementById("tripImagesInput").click()
                  }
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Image
                </button>

                <input
                  type="file"
                  id="tripImagesInput"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={selectImages}
                />

                <button
                  onClick={uploadImages}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
                >
                  Upload
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {trip.images && trip.images.length > 0 ? (
                  trip.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.url}
                        alt="Trip"
                        className="w-full h-40 object-cover rounded-lg shadow"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded opacity-80 group-hover:opacity-100"
                        onClick={() => console.log("Delete Image:", img.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No images available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default TripInfo;
