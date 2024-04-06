import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../button/Button";

const Navigation = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "Add Payment",
      path: "/new-payment",
    },
  ];
  return (
    <div className="w-full bg-primary flex items-center justify-between px-10 py-4">
      <Link>
        <img src={logo} alt="blaze logo" />
      </Link>
      <div className="flex gap-10 items-center">
        {links?.map(({ label, path }) => (
          <Link className="text-white hover:font-bold" key={path} to={path}>
            {label}
          </Link>
        ))}
        <Button label={"Logout"} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Navigation;
