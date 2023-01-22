import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import Menu from "./Pages/AdminDashboard/Menu";
import MenuList from "./Pages/AdminDashboard/MenuList";
import MyOrders from "./Pages/AdminDashboard/MyOrders";
import ContactMessages from "./Pages/AdminDashboard/ContactMessages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminDashboard/Menu" element={<Menu />} />
          <Route path="/AdminDashboard/MenuList" element={<MenuList />} />
          <Route path="/AdminDashboard/MyOrders" element={<MyOrders />} />
          <Route
            path="/AdminDashboard/ContactMessages"
            element={<ContactMessages />}
          />
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
    </>
  );
}

export default App;
