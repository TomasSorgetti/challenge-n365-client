import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.email && form.password) {
      const URL = `${URL_BASE}/user/login`;
      try {
        await axios.post(URL, form).then((response) => {
          if (!response) throw new Error("error to login");
          const token = response.data;
          if (token) {
            localStorage.setItem("token", token);
            navigate("/home");
          }
        });
      } catch (error) {
        if (error.response.data.error) setErrors(error.response.data.error);
        console.log(error);
      }
    }
  };

  return (
    <section className="h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-primary w-[400px] p-10 rounded-lg flex flex-col items-center"
      >
        <div className="h-20 w-full flex flex-col items-center">
          <img className="w-32" src={logo} alt="blaze logo" />
          <span className="text-red-600">{errors}</span>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="">Email:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="text"
              placeholder="email@mail.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-10">
          <Link to="/register" className="underline">
            you dont have account?
          </Link>
          <Button label="Login" />
        </div>
      </form>
    </section>
  );
};

export default Login;
