import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ProtectedLoginRoute, ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* <Route element={<ProtectedLoginRoute />}>
      </Route> */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route element={<ProtectedRoutes />}>
      </Route> */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
