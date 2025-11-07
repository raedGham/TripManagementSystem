import { BrowserRouter, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home/Home";
import Main from "./pages/home/Main";
import Navbar from "./components/navbar/navbar";
import Layout from "./components/layout/layout"
import Login from  "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>     
          <Route path="/register" element={<Register/>}></Route> 

          <Route path="/main" element={
            <Layout>
                <Navbar/>
               <Main/>
            </Layout>
            }>
          </Route> 
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    
  );
}

export default App;
