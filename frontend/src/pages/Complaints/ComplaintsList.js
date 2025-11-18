import React , {useState} from 'react'
import {Link} from "react-router"
import Search from "../../components/search/Search"
function ComplaintsList() {
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] = useState([])

return (
   <div className="">


    <div className="w-full rounded-lg shadow  p-14">
      <div className="flex">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
          User Complaints
        </h1>
        <Link
          to="complaints/new"
          className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
        >
          Add a Complaint
        </Link>

        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      </div>
      <div className="overflow-x-auto">
        {!complaints && <p>Loading...</p>}

        {complaints.length === 0 ? (
          <p className=" text-gray-400 mt-2">
            -- No Complaints Found ...
          </p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Filed
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Reviewed
                </th>                

              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => {
                const {
                  _id,
                  category,
                  status,
                  dateFiled,
                  dateReviewed,
                  
                } = complaint;
                return (
                  <tr
                    key={_id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{category}</td>
                    <td className="px-3 py-2">{status}</td>
                    <td className="px-3 py-2">{dateFiled}</td>
                    <td className="px-3 py-2">{dateReviewed}</td>                 
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
   
    
  )
}

export default ComplaintsList