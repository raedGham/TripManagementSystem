import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

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
            <Link to="/destinations" className="hover:text-gray-300">
              Destinations
            </Link>
          </li>

          <li>
            <Link to="/reservation" className="hover:text-gray-300">
              Reservation
            </Link>
          </li>

          <li>
            <Link to="/payments" className="hover:text-gray-300">
              Payments
            </Link>
          </li>

          {/* Dropdown */}
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-gray-300"
            >
              Administration ▼
            </button>

            {open && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                <li>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/trips"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Trips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/reports"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Reports
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={logout} className="hover:text-gray-300">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
