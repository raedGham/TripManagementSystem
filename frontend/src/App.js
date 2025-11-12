import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Main from "./pages/home/Main";
import Layout from "./components/layout/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import TripsList from "./pages/admin/trips/TripsList";
import AddTrip from "./pages/admin/trips/AddTrip";
import TripInfo from "./pages/admin/trips/TripInfo";
import AddTrans from "./pages/admin/transportation/AddTrans";
import TransList from "./pages/admin/transportation/TransList";
import AddActivity from "./pages/admin/activities/AddActivity";
import ActivityList from "./pages/admin/activities/ActivityList";
import UsersList from "./pages/admin/users/UsersList";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>          
          <Route path="/main" element={<Main />}></Route>
          <Route path="/admin/trips/new" element={<AddTrip />}></Route>
          <Route path="/admin/trips" element={<TripsList />}></Route>
          <Route
            path="/admin/trips/trip-info/:id"
            element={<TripInfo />}
          ></Route>

          <Route path="/admin/trans/new/:tripID" element={<AddTrans />}></Route>
          <Route path="/admin/trans/:tripID" element={<TransList />}></Route>

          <Route
            path="/admin/activity/new/:tripID"
            element={<AddActivity />}
          ></Route>
          <Route
            path="/admin/activity/:tripID"
            element={<ActivityList />}
          ></Route>

           <Route
            path="/admin/users"
            element={<UsersList />}
          ></Route>
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
