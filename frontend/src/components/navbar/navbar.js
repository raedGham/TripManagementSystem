import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import {
  SET_LOGIN,
  selectName,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(selectName);
  const email = useSelector((state) => state.auth.user?.email);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const adminRef = useRef(null);
  const userRef = useRef(null);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        adminRef.current &&
        !adminRef.current.contains(e.target) &&
        userRef.current &&
        !userRef.current.contains(e.target)
      ) {
        setOpenAdmin(false);
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-white">
          LOGO
        </Link>

        {/* Menu */}
        <ul className="flex items-center space-x-8 text-white font-medium">
          <li>
            <Link to="/destination" className="hover:text-gray-300">
              Destinations
            </Link>
          </li>

          <li>
            <Link to="/userreservation" className="hover:text-gray-300">
              Reservation
            </Link>
          </li>

          <li>
            <Link to="/payment" className="hover:text-gray-300">
              Payments
            </Link>
          </li>

          {/* Admin Dropdown */}
          {isLoggedIn && (
            <li className="relative" ref={adminRef}>
              <button
                onClick={() => {
                  setOpenAdmin(!openAdmin);
                  setOpenUserMenu(false);
                }}
                className="hover:text-gray-300"
              >
                Administration ▼
              </button>

              {openAdmin && (
                <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                  <li>
                    <Link
                      to="/admin/users"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setOpenAdmin(false)}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/trips"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setOpenAdmin(false)}
                    >
                      Trips
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/reports"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setOpenAdmin(false)}
                    >
                      Reports (future use)
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* User section */}
          <li className="relative" ref={userRef}>
            {isLoggedIn ? (
              <>
                {/* Avatar Circle */}
                <button
                  onClick={() => {
                    setOpenUserMenu(!openUserMenu);
                    setOpenAdmin(false);
                  }}
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold hover:bg-gray-600 focus:outline-none"
                >
                  {firstLetter}
                </button>

                {/* Dropdown */}
                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg py-3">
                    <div className="px-4 pb-2 border-b border-gray-200">
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-gray-500">{email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setOpenUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
