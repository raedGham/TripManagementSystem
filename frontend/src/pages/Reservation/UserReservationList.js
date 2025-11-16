import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserID } from "../../redux/features/auth/authSlice";
import { fetchReservs } from "../../redux/features/reservation/ReservationSlice";

function UserReservationList() {
  const dispatch = useDispatch();
  const userID = useSelector(selectUserID);

  useEffect(() => {
    dispatch(fetchReservs());
  }, [dispatch]);
  const { reserves } = useSelector((state) => state.reservation);

  console.log("User:", userID);
  console.log("reserves:", reserves);
  return (
    <div className="">
      <div className="w-full rounded-lg shadow  p-14">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            My Reservations
          </h1>
        </div>
        <div className="overflow-x-auto">
          {!reserves && <p>Loading...</p>}

          {reserves.length === 0 ? (
            <p className=" text-gray-400 mt-2">
              -- You have No Reservations Yet ....
            </p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
              <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trip Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cost /Person
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thumbnail
                  </th>
                </tr>
              </thead>
              <tbody>
                {reserves.map((Reserv, index) => {
                  const { _id, userID, tripID, noOfPersons, costPerPerson } =
                    Reserv;
                  return (
                    <tr
                      key={_id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{tripID}</td>
                      <td className="px-3 py-2">{noOfPersons}</td>
                      <td className="px-3 py-2">{costPerPerson}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserReservationList;
