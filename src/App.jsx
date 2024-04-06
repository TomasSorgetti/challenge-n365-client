import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ProtectedLoginRoute, ProtectedRoutes } from "./utils/ProtectedRoutes";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedLoginRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
