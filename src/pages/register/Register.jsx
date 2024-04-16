import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";
import validate from "./Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  //******** Alerts ********/
  const notifyOk = () => toast.success("You have create a new account");
  const notifyError = () => toast.error("Error creating account");
  const notifyWarn = () => toast.warn("Complete fields");

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
      setIsLoading(true);
      const URL = `${URL_BASE}/user`;
      try {
        await axios.post(URL, form).then((response) => {
          if (response) {
            setIsLoading(false);
            const token = response.data.token;
            if (token) {
              localStorage.setItem("token", token);
              setTimeout(() => {
                navigate("/home");
              }, 1000);
              notifyOk();
            }
          }
        });
      } catch (error) {
        setIsLoading(false);
        notifyError();
        if (error.response.data.error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            errorResponse: error.response.data.error,
          }));
        }
        console.log(error);
      }
    } else notifyWarn();
  };

  const override = {
    position: "absolute",
    top: "40px",
  };
  return (
    <section className="h-screen flex items-center justify-center text-white">
      <ClipLoader
        color={"#0d0b1f"}
        loading={isLoading}
        size={30}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ToastContainer position="bottom-left" autoClose={1000} />
      <form
        onSubmit={handleSubmit}
        className="bg-primary w-11/12 sm:w-7/12 md:w-6/12 lg:w-[400px] pt-4 pb-10 px-8 sm:px-10 lg:p-10 rounded-lg flex flex-col items-center justify-between"
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
          className="flex flex-col gap-4 mt-6 lg:mt-10
        "
        >
          <Link to="/" className="underline">
            you already have account?
          </Link>
          <button className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold">
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
