import { Link } from "react-router-dom";

import heroImg from "../../assets/welcome.jpg"; // Adjust path as needed


const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImg}
       
        alt="Inventory"
        className="absolute inset-0 w-2 h-[800px] object-cover object-center z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-start px-6 md:px-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Smart Inventory <br className="hidden md:block" />
          Stock Management
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md max-w-xl">
          Real-time inventory control designed to scale your business. Manage products, track stock, and optimize your warehouse with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-medium shadow-md transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 rounded-lg text-lg font-medium shadow-md transition"
          >
            Login
          </Link>
 

         
        </div>        
      </div>
    </div>
  );
};

export default Home;
