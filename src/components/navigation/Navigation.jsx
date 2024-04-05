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
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="w-full bg-primary flex items-center justify-between px-10 py-4">
      <Link>
        <img src={logo} alt="blaze logo" />
      </Link>
      <div className="flex gap-10">
        <ul className="flex gap-10 text-white items-center">
          {links?.map(({ label, path }, key) => (
            <li key={key}>
              <Link to={path} className="hover:font-bold">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Button label={"Logout"} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Navigation;
