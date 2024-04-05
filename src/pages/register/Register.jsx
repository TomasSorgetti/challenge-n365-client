import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";

const Register = () => {
  return (
    <section className="h-screen flex items-center justify-center text-white">
      <form
        action=""
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
          <div className="flex flex-col">
            <label htmlFor="">Confirm password:</label>
            <input
              className="h-10 rounded-sm p-2 text-primary"
              type="password"
              placeholder="********"
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
