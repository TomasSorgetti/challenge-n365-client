import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logout from "../../assets/logout-icon.png";

const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full bg-primary flex items-center justify-between px-10 py-4">
      <Link to={"/home"}>
        <img src={logo} alt="blaze logo" />
      </Link>
      <div className="flex gap-10 items-center">
        <button
          className="text-white flex gap-1 items-center hover:font-bold"
          onClick={handleClick}
        >
          <img className="w-6 mt-1" src={logout} alt="logout icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
