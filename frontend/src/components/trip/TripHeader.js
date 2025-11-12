import { selectTrip } from "../../redux/features/trips/tripSlice";
import { useSelector } from "react-redux";


function TripHeader({tripID}) {

const trip = useSelector(selectTrip);

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
     <section className="m-12 mb-0 text-white space-y-0">
        {trip && (
          <>
            {/* Trip Header */}
            <header className="bg-gray-800/40 p-8 rounded-xl shadow-lg space-y-2">
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

  )
}

export default TripHeader