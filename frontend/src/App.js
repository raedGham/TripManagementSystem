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
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
