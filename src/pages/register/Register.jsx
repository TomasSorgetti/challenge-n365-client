import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
import { URL_BASE } from "../../utils/constants";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.email && form.password && form.password === form.confirm) {
      const URL = `${URL_BASE}/user`;
      await axios.post(URL, form).then((response) => {
        if (!response) throw new Error("error creating user");
        const token = response.data;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/home");
        }
      });
    }
  };
  return (
    <section className="h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-primary w-[400px] h-[480px] p-10 rounded-lg flex flex-col items-center justify-between"
      >
        <img src={logo} alt="blaze logo" />
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
          <div className="flex flex-col">
            <label htmlFor="">Confirm password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
            />
          </div>
        </div>
        <Link to="/" className="underline">
          you allready have account?
        </Link>
        <Button label="Register" />
      </form>
    </section>
  );
};

export default Register;
