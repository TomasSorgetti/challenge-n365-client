import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import CryptoJS from "crypto-js";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [persist, setPersist] = useState(false);

  //**** useEffect for set initial form with the remembered data
  useEffect(() => {
    const encryptedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password");
    if (encryptedEmail && encryptedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail,
        "something secret"
      ).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        "something secret"
      ).toString(CryptoJS.enc.Utf8);
      setForm({
        email: decryptedEmail || "",
        password: decryptedPassword || "",
      });
    }
  }, []);

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
      setIsLoading(true);
      const URL = `${URL_BASE}/user/login`;
      try {
        //   let headers = new Headers();
        //   headers.append("Content-Type", "application/json");
        //   headers.append("Accept", "application/json");
        //   await fetch(URL, {
        //   method: "POST",
        //   mode: "cors",
        //   credentials: "include",
        //   headers: headers,
        //   body: JSON.stringify({
        //     email: form.email,
        //     password: form.password,
        //   }),
        // });
        await axios.post(URL, form).then((response) => {
          if (!response) throw new Error("error to login");
          setIsLoading(false);
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            navigate("/home");
          }
        });
      } catch (error) {
        setIsLoading(false);
        if (error.response.data.error) setErrors(error.response.data.error);
        console.log(error);
      }
    }
  };

  //! Do not trust this code, its just a test xd
  //************ Persist checkbox *************/
  const togglePersist = () => {
    setPersist((prev) => {
      const newValue = !prev;
      localStorage.setItem("persist", newValue);
      return newValue;
    });
  };
  useEffect(() => {
    const persistedValue = localStorage.getItem("persist");
    if (persistedValue !== null) {
      setPersist(persistedValue === "true");
    }
  }, []);
  useEffect(() => {
    if (persist) {
      const encryptedEmail = CryptoJS.AES.encrypt(
        form.email,
        "something secret"
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        form.password,
        "something secret"
      ).toString();
      localStorage.setItem("email", encryptedEmail);
      localStorage.setItem("password", encryptedPassword);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, [persist, form.email, form.password]);

  const override = {
    position: "absolute",
    top: "40px",
  };
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <ClipLoader
        color={"#0d0b1f"}
        loading={isLoading}
        size={30}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-primary w-11/12 sm:w-7/12 md:w-6/12 lg:w-[400px] p-10 rounded-lg flex flex-col items-center"
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
          <div className="flex gap-2 justify-start">
            <input
              onChange={togglePersist}
              checked={persist}
              type="checkbox"
              name="persist"
              id=""
            />
            <label htmlFor="">Remember me?</label>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-10 xl:mt-14">
          <Link to="/register" className="underline">
            you dont have account?
          </Link>
          <button className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
