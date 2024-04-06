import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../button/Button";

const Navigation = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full bg-primary flex items-center justify-between px-10 py-4">
      <Link>
        <img src={logo} alt="blaze logo" />
      </Link>
      <div className="flex gap-10">
        <Link to={"/settings"}>Settings</Link>
        <Button label={"Logout"} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Navigation;