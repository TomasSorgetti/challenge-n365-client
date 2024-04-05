import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <h1>Hello World!</h1>
      <button className="bg-secondary px-6 py-2" onClick={handleClick}>
        Logout Test
      </button>
    </>
  );
};

export default Home;
