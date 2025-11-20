import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserID,
  selectIsLoggedIn,
} from "../../../redux/features/auth/authSlice";
import { fetchReservs } from "../../../redux/features/reservation/ReservationSlice";

function AdminReservationList() {
  const dispatch = useDispatch();
  const userID = useSelector(selectUserID);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchReservs());
  }, [dispatch]);

  const { reserves } = useSelector((state) => state.reservation);
 

  return (
    <div className="">
      {isLoggedIn ? (
        <div className="w-full rounded-lg shadow p-14">
          <div className="flex">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
              Reservations List
            </h1>
          </div>

          <div className="overflow-x-auto">
            {!reserves && <p>Loading...</p>}

            {reserves.length === 0 ? (
              <p className="text-gray-400 mt-2">
                -- No Reservations Yet ....
              </p>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
                <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-3">S/N</th>
                    <th className="px-6 py-3">User Name</th>
                    <th className="px-6 py-3">Trip Title</th>
                    <th className="px-6 py-3">Reservation Date</th>
                    <th className="px-6 py-3">Start Date</th>
                    <th className="px-6 py-3">End Date</th>
                    <th className="px-6 py-3">Cost /Person</th>
                    <th className="px-6 py-3">No of People</th>
                    <th className="px-6 py-3">Total Cost</th>
                    <th className="px-6 py-3">Reserv Status</th>                    
                    <th className="p-[80px] py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {reserves.map((Reserv, index) => {
                    const {
                      _id,
                      tripID,
                      numberOfPeople,
                      status,
                      reservationDate,
                    } = Reserv;

                    return (
                      <tr
                        key={_id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{userID.name}</td>
                        <td className="px-3 py-2">{tripID.title}</td>
                        <td className="px-3 py-2">{reservationDate}</td>
                        <td className="px-3 py-2">{tripID.startDate}</td>
                        <td className="px-3 py-2">{tripID.endDate}</td>
                        <td className="px-3 py-2">{tripID.pricePerPerson}</td>
                        <td className="px-3 py-2">{numberOfPeople}</td>
                        <td className="px-3 py-2">
                          {tripID.pricePerPerson * numberOfPeople}
                        </td>
                        <td className="px-3 py-2">{status}</td>                                              
                     </tr>

                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium m-[80px]">
          Please log in to view your reservations.
        </p>
      )}
    </div>
  );
}

export default AdminReservationList;
