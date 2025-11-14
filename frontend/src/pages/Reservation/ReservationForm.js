
import logo from "../../assets/Logo.png";
import { selectName , selectUser} from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import {getTrip} from "../../redux/features/trips/tripSlice";
import { useEffect } from "react";

function ReservationForm({
  numberOfPeople,
  status,
  trip,
  userID,
  handleInputChange,
  addReserv,
  formTitle
}) {
  console.log("Trip:", trip)
 
  const namewithquotes = localStorage.getItem("name");
  const name = namewithquotes.replace(/"/g, "");
  const emailWithQuotes = localStorage.getItem("email");
  const email = emailWithQuotes.replace(/"/g, "");

 
  
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-12 h-12 mr-2 rounded-2xl shadow-2xl"
            src={logo}
            alt="logo"
          />
          Travel Lebanon
        </a>

        {/* Increased max width to lg:max-w-4xl for a wider window */}

        <div className="w-full rounded-lg shadow dark:border md:mt-0 lg:max-w-4xl xl:p-0 bg-white/60 dark:bg-gray-800/60 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {formTitle}
            </h1>
          <div className="leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            <p>Name:    {name}</p>
            <h1>Email: {email}</h1>
            <p>Trip: {trip.title}</p>
          
          </div>  
            {/* Grid for two columns */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={addReserv}
            >
              <div>
                <label
                  htmlFor="numberOfPeople"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Number Of People
                </label>
                <input
                  type="text"
                  value={numberOfPeople}
                  onChange={handleInputChange}
                  name="numberOfPeople"
                  id="numberOfPeople"
                  placeholder="Enter number of people"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

      <div>
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Type
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Type</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

             <div className="md:col-span-2">
                <button
                  type="submit"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {formTitle === "Edit Reservation" ? "Submit" : "Add Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationForm;
