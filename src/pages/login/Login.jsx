import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = () => {};
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <section className="h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-primary w-[400px] h-[450px] p-10 rounded-lg flex flex-col items-center justify-between"
      >
        <img src={logo} alt="blaze logo" />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="">Email:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="text"
              placeholder="email@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <Link to="/register" className="underline">
          you dont have account?
        </Link>
        <Button label="Login" />
      </form>
    </section>
  );
};

export default Login;
