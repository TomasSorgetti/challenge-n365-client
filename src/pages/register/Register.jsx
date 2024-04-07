import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";
import validate from "./Validation";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm: "",
    errorResponse: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }, errors));
    setForm({ ...form, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      form.email &&
      form.password &&
      form.password === form.confirm &&
      !errors.email &&
      !errors.password &&
      !errors.confirm
    ) {
      const URL = `${URL_BASE}/user`;
      try {
        await axios.post(URL, form).then((response) => {
          if (response) {
            const token = response.data;
            if (token) {
              localStorage.setItem("token", token);
              navigate("/home");
            }
          }
        });
      } catch (error) {
        if (error.response.data.error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            errorResponse: error.response.data.error,
          }));
        }
        console.log(error);
      }
    }
  };
  return (
    <section className="h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-primary w-[400px] p-10 rounded-lg flex flex-col items-center justify-between"
      >
        <div className="h-20 w-full flex flex-col items-center">
          <img className="w-32" src={logo} alt="blaze logo" />
          <span className="text-red-600">{errors.errorResponse}</span>
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col relative">
            <label htmlFor="">Email:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="text"
              placeholder="email@mail.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && errors.email !== "" && (
              <span className="text-red-600 absolute left-0 -bottom-6">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="">Password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && errors.password !== "" && (
              <span className="text-red-600 absolute left-0 -bottom-6">
                {errors.password}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="">Confirm password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
            />
            {errors.confirm && errors.confirm !== "" && (
              <span className="text-red-600 absolute left-0 -bottom-6">
                {errors.confirm}
              </span>
            )}
          </div>
        </div>
        <div
          className="flex flex-col gap-4 mt-10
        "
        >
          <Link to="/" className="underline">
            you already have account?
          </Link>
          <Button label="Register" />
        </div>
      </form>
    </section>
  );
};

export default Register;
