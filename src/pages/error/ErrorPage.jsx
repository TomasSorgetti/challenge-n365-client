import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary text-white">
      <div className="flex flex-col items-center gap-10">
        <img className="lg:w-[200px]" src={logo} alt="blaze logo" />
        <h1 className=" text-[2.2rem] lg:text-[4rem] px-6 text-center font-semibold">
          Ooops! Something went wrong
        </h1>
        <p className="text-[1rem] lg:text-[2rem] px-6 text-center">{`Sorry, something went wrong :(`}</p>
        <Link
          className="bg-secondary border-[1px] border-solid border-secondary text-white px-10 py-2 rounded-md font-semibold hover:bg-primary hover:border-white focus:font-bold"
          to={"/home"}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
