import React from 'react'
import logo from "../../../assets/Logo.png";

function TripForm({ title, destination, demographic, startDate, endDate, pricePerPerson,organizerID, handleInputChange, addTrip, formTitle}) {
  return (
    


<section className ="">

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

        {/* Grid for two columns */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={addTrip}
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleInputChange}
                name="title"
                id="title"
                placeholder="Enter trip name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={handleInputChange}
                name="destination"
                id="destination"
                placeholder="Enter trip name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>









    
            <div>
              <label
                htmlFor="pricePerPerson"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price Per Person
              </label>
              <input
                type="text"
                value={pricePerPerson}
                onChange={handleInputChange}
                name="pricePerPerson"
                id="pricePerPerson"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>

          
          {/* FULL-WIDTH BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className=" text-white  bg-indigo-600 hover:bg-indigo-700 
                         focus:ring-4 focus:outline-none focus:ring-primary-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {formTitle === "Edit Trip" ? "Submit" : "Add Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>


  )
}

export default TripForm